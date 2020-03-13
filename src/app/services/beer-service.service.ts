
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class BeerServiceService {
APIPath: string = 'https://api.punkapi.com/v2/beers';
  // Value of maxPerPage should be evenly divisable 2, 3, and 4... UI bootstrap
  private maxPerPage: number = 36;
  private currentFilter: number;
  // Empty string to setup for API calls and cleaner/readable code
  private apiString: any;

  constructor(private http: Http) { }
  
  // Select what page and filter to apply to query then get from API string
  // 0 = 5% ABV or LESS
  // 1 = 5% ABV or GREATER
  // Any other number not assigned will return all beers
  // Page number is set up to save what page the client is on and return page based prev/next page
  public GetBeersPage(page: number = 1, currentFilter){
    if (currentFilter == 0){      
      this.GetLess5ABVBeers(page);
      return this.apiString;
    }
    else if (currentFilter == 1){      
      this.GetGreater5ABVBeers(page);
      return this.apiString;
    }
    else
    {
      this.GetAllBeers(page);
      return this.apiString;
    }
  }

  // Sets Filter based on what client selects(button)
  private SetFilter(changeFilter: number){
    this.currentFilter = changeFilter;
  }
  
  // GET
    // All beers set to apiString
  private GetAllBeers(page: number = 1) {    
    this.apiString = this.http.get(`${this.APIPath}?page=${page}&per_page=${this.maxPerPage}`)
      .map((res: Response) => res.json());
  }
    // All beers GREATER than 5, set to apiString abv_gt= is query
  private GetGreater5ABVBeers(page: number = 1) {
    this.apiString =  this.http.get(`${this.APIPath}?abv_gt=5&page=${page}&per_page=${this.maxPerPage}`)
      .map((res: Response) => res.json());
  }
    // All beers LESS than 5, set to apiString abv_lt= is query
  private GetLess5ABVBeers(page: number = 1) {
    this.apiString =  this.http.get(`${this.APIPath}?abv_lt=5&page=${page}&per_page=${this.maxPerPage}`)
      .map((res: Response) => res.json());
  }

}