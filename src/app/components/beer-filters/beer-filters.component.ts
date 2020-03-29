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

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  

  ngOnInit() {
    // let beerFiltersSettings = new BeerFiltersSettings();
    this.dropdownList = [
      { filter_id: 1, item_text: 'ABV > 5' },
      { filter_id: 2, item_text: 'ABV < 5' },
      { filter_id: 3, item_text: 'IBU > 50' },
      { filter_id: 4, item_text: 'IBU < 50' }
    ];

    this.selectedItems = [
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'filter_id',
      textField: 'item_text',
      enableCheckAll: false,
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
    this.beerService.initializeBeerFiltersClass(this.dropdownList, this.selectedItems, this.dropdownSettings);
  }
  onItemSelect(item: any) {
    this.beerService.addQueryFilter(item);
  }

  onItemDeSelect(item: any) {
    this.beerService.removeQueryFilter(item);
  }
}