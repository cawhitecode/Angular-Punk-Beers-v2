
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, merge, interval  } from "rxjs";
import { take } from 'rxjs/operators';
import {concat} from "rxjs/observable/concat";
import 'rxjs/add/operator/map';

export interface Beer {
  abv: number;
  ebc: number;
  ibu: number;
  ph: number;
  name: string;
  first_brewed: string;
  image_url: string;
  tageline: string;
  id: number;
  description: string;
  food_pairing: Array<string>;
}

export class BeerFiltersSettings {
  dropdownList = [
      { filter_id: 1, item_text: 'ABV > 5' },
      { filter_id: 2, item_text: 'ABV < 5' },
      { filter_id: 3, item_text: 'IBU > 50' },
      { filter_id: 4, item_text: 'IBU < 50' }
    ];
    selectedItems = [
    ];
    dropdownSettings = {
      singleSelection: false,
      idField: 'filter_id',
      textField: 'item_text',
      enableCheckAll: false,
      itemsShowLimit: 5,
      allowSearchFilter: false
    };

}

@Injectable()
export class BeerService {
  private beers = new BehaviorSubject<Beer[]>(null);
  beers$: Observable<Beer[]> = this.beers.asObservable();
  private path = "https://api.punkapi.com/v2/beers"; // This should use Environment Variables

  // Value of maxPerPage should be evenly divisable 2 and 3... UI bootstrap
  private maxPerLoad = 12;
  private page = 1;
  private filter = 0;
  private apiPath = `${this.path}?page=${this.page}&per_page=`;
  private queryParams = [ '&abv_gt=5', '&abv_lt=5', '&ibu_gt=50', '&ibu_lt=50'];
    

  constructor(private http: HttpClient) {
    this.goToPage();
  }

  goToPage(page = 1): void {
    if (page < 1) {
      // Default to page 1
      page = 1;
    }
    this.page = page;

    this.http.get<Beer[]>(this.APIPath()).subscribe(v => this.beers.next(v));
  }


  // Loads More Beer by adding 12 until max of 72 beers
  nextBeerLoad(): void {
    if (this.maxPerLoad == 72){
      this.http.get<Beer[]>(this.APIPath()).subscribe(v => this.beers.next(v));

    } else {
      this.maxPerLoad = this.maxPerLoad + 12;
      this.http.get<Beer[]>(this.APIPath()).subscribe(v => this.beers.next(v));
    }
  }

  // Resets filter to 0 and by APIpath resets query string
  homePage(): void {
    this.page = 1;
    this.filter = 0;
    this.maxPerLoad = 12;
    this.http.get<Beer[]>(this.APIPath()).subscribe(v => this.beers.next(v));
  }
  
  // Adds query string based on filter input
  public addQueryFilter(item: any) {
    this.addFilter(item.filter_id);    
  }

  // Removes query string based on filter input
  public removeQueryFilter(item: any) {
    this.removeFilter(item.filter_id);    
  }

  // Applies filter to api string then gets beers associated
  private addFilter(filter = 0): void {
    this.filter = filter;    

    this.http.get<Beer[]>(this.APIPath()).subscribe(v => this.beers.next(v));
  }
  
  // Removes filter to api string then gets beers associated
  private removeFilter(filter = 0): void {
    this.filter = filter;

    this.http.get<Beer[]>(this.APIPathRemove()).subscribe(v => this.beers.next(v));
  }

  /* 
    Select what page and filter to apply to query then get from API string
    0 = No filter and loads 
    1 = 5% ABV or GREATER
    2 = 5% ABV or LESS
    3 = 50 IBU or GREATER
    4 = 50 IBU or LESS
    Any other number not assigned will return all beers
    Page number is set up to save what page the client is on and return page based prev/next page
  */
  private APIPath(): string {
    let tempApiPath = `${this.path}?page=${this.page}&per_page=`
    if (this.filter == 0 || this.filter > 4){
      this.apiPath = `${tempApiPath}${this.maxPerLoad}`;
        return this.apiPath;
    } else {
        this.APIpathCheckingForDuplicateParamsAndConcat(this.filter, tempApiPath);
        return this.apiPath;
    }
  }

  // Removing query params from APIPath string -- Removing filter to align with the queryParams Array
  private APIPathRemove(): string {
    this.RemoveFilterBasedOnFilterNumber(this.filter);
    return this.apiPath;
  }

  // Concat together apiPath string based on index of 'per_page=' then add on substring after number has been added
  private APIPathConcat(tempApiPath: string) {
    let indexOfPage = this.apiPath.indexOf('per_page=');
        this.apiPath = tempApiPath + this.maxPerLoad + this.apiPath.substring(indexOfPage + 11, this.apiPath.length);
  }

  // This checks for the filter based on the index of queryParams which is offset by one of filter
  /// queryParams = [ '&abv_gt=5', '&abv_lt=5', '&ibu_gt=50', '&ibu_lt=50'];
  private CheckStringForDoubleQueryParams(filter: number) : boolean {
      return this.apiPath.includes(this.queryParams[filter - 1]);
    }

  // Removes filter based on filter input in correlation to queryParams
  /// queryParams = [ '&abv_gt=5', '&abv_lt=5', '&ibu_gt=50', '&ibu_lt=50'];
  private RemoveFilterBasedOnFilterNumber(filter: number) {
    this.apiPath = this.apiPath.replace(this.queryParams[this.filter - 1], "");
  }

  // Checks for duplicate params to not query API twice and if no duplicates then add from queryParams to apiPath
  /// queryParams = [ '&abv_gt=5', '&abv_lt=5', '&ibu_gt=50', '&ibu_lt=50'];
  private APIpathCheckingForDuplicateParamsAndConcat(filter: number, tempApiPath: string){
    if (this.CheckStringForDoubleQueryParams(filter))
    {
      this.APIPathConcat(tempApiPath);
      return this.apiPath;
    } else {
      this.apiPath = this.apiPath + this.queryParams[filter - 1];
      return this.apiPath;
    }
  }

}