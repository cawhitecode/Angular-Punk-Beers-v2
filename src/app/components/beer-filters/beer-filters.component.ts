import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BeerService, BeerFiltersSettings } from '../../services/beer-service.service';


@Component({
  selector: 'app-beer-filters',
  templateUrl: './beer-filters.component.html',
  styleUrls: ['./beer-filters.component.css']
})
export class BeerFiltersComponent implements OnInit {

  // New Object from beer-service - BeerFiltersSettings - Default no Selected
  beerFiltersSettings = new BeerFiltersSettings();

  // Values to initialize multi-select options
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};  

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    // Uses beerFiltersSettings to setup multi-select
    this.dropdownList = this.beerFiltersSettings.dropdownList;
    this.selectedItems = this.beerFiltersSettings.selectedItems;
    this.dropdownSettings = this.beerFiltersSettings.dropdownSettings;    
  }
  
  onItemSelect(item: any) {
    this.beerService.addQueryFilter(item);
  }

  onItemDeSelect(item: any) {
    this.beerService.removeQueryFilter(item);
  }  
}