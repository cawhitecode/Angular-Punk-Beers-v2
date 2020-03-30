import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BeerService, BeerFiltersSettings } from '../../services/beer-service.service';


@Component({
  selector: 'app-beer-filters',
  templateUrl: './beer-filters.component.html',
  styleUrls: ['./beer-filters.component.css']
})
export class BeerFiltersComponent implements OnInit { 
  constructor(private beerService: BeerService) {}
  
  beerFiltersSettings = new BeerFiltersSettings();
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  

  ngOnInit() {
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