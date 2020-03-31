
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, merge, interval  } from "rxjs";
import { take } from 'rxjs/operators';
import {concat} from "rxjs/observable/concat";

export interface Beer {
  abv: number;
  ebc: number;
  ibu: number;
  ph: number;
  name: string;
  first_brewed: string;
  image_url: string;
  tageline: string;
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
  private pageFilter = 1;
  private apiPath = `${this.path}?page=${this.page}&per_page=${this.maxPerLoad}`;
    

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
    this.http.get<Beer[]>(this.APIPath()).subscribe(v => this.beers.next(v));
  }
  
  // Adds query string based on filter input
  public addQueryFilter(item: any) {

    switch (item.filter_id)
    {
      case 1:
        this.addFilter(1);
        break;
      case 2:
        this.addFilter(2);
        break;
      case 3:
        this.addFilter(3);
        break;
      case 4:
        this.addFilter(4);
        break;
      default:
        console.log(item.filter_id);
        break;
    }
    
  }

  // Removes query string based on filter input
  public removeQueryFilter(item: any) {
    switch (item.filter_id)
    {
      case 1:
        this.removeFilter(101);
        break;
      case 2:
        this.removeFilter(102);
        break;
      case 3:
        this.removeFilter(103);
        break;
      case 4:
        this.removeFilter(104);
        break;
      default:
        this.homePage();
        break;
    }
    
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

  // Select what page and filter to apply to query then get from API string
  // 1 = 5% ABV or GREATER
  // 2 = 5% ABV or LESS
  // Any other number not assigned will return all beers
  // Page number is set up to save what page the client is on and return page based prev/next page
  private APIPath(): string {
    switch (this.filter) {
      case 0:
        this.apiPath = `${this.path}?page=${this.page}&per_page=${this.maxPerLoad}`;
        return this.apiPath;
      case 1:
        this.apiPath = this.apiPath + "&abv_gt=5";
          return this.apiPath;
      case 2:
        this.apiPath = this.apiPath + "&abv_lt=5"      
          return this.apiPath;
      case 3:
        this.apiPath = this.apiPath + "&ibu_gt=50";
          return this.apiPath;
      case 4:
        this.apiPath = this.apiPath + "&ibu_lt=50";
          return this.apiPath;
      default:
        return this.apiPath;
    }
  }

  // Removing query params from APIPath string -- Opposite of APIPath
  // Each case is 10 + filter. I.e. Add 100.
  private APIPathRemove(): string {
    switch (this.filter) {    
      case 101:
        this.apiPath = this.apiPath.replace("&abv_gt=5", "");
          return this.apiPath;
      case 102:
        this.apiPath = this.apiPath.replace("&abv_lt=5", "");
          return this.apiPath;
      case 103:
        this.apiPath = this.apiPath.replace("&ibu_gt=50", "");
          return this.apiPath;
      case 104:
        this.apiPath = this.apiPath.replace("&ibu_lt=50", "");
          return this.apiPath;
      default:
        return this.apiPath;
    }
  }
}