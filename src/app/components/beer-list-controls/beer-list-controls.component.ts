import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-beer-list-controls',
  templateUrl: './beer-list-controls.component.html',
  styleUrls: ['./beer-list-controls.component.css']
})
export class BeerListControlsComponent implements OnInit {
  @Output() UpdatePage = new EventEmitter<number>();
  @Output() UpdateFilter = new EventEmitter<number>();
  private currentFilter = 0;
  private currentPage = 1;

  constructor() {}

  ngOnInit() {}

  // Current page increment down and if less 1 sets page to 1, Emits event UpdatePage with value of new page to query API
  PrevPage() {
    this.currentPage--;
    this.ResetToZeroIfCurrentPageLessThan1();     
    this.UpdatePage.emit(this.currentPage);
  }

  // Current page increment up and Emits event UpdatePage with value of new page to query API
  NextPage() {
    this.currentPage++;   
    this.UpdatePage.emit(this.currentPage);
  }

  // Emits greater than 5 filter and resets page to 1 for new filter, then UpdatePage to call API and reload Page.
  ABV5Greater() {
    this.currentPage = 1;
    this.currentFilter = 1;
    this.UpdateFilter.emit(this.currentFilter);
    this.UpdatePage.emit(this.currentPage);
  }
  
  // Emits less than 5 filter and resets page to 1 for new filter, then UpdatePage to call API and reload Page.
  ABV5Less() {
    this.currentPage = 1;
    this.currentFilter = 0;
    this.UpdateFilter.emit(this.currentFilter);
    this.UpdatePage.emit(this.currentPage);     
  }

  // This variable is named well
  ResetToZeroIfCurrentPageLessThan1(){
    if (this.currentPage < 1)
    {
      this.currentPage = 1;
    }
  }
}