import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BeerService } from '../../services/beer-service.service';


@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {
  @Output() UpdatePage = new EventEmitter<number>();
  private currentPage = 1;

  selector: string = '.main-panel';

  constructor(private beerService: BeerService) {}

  ngOnInit() {
  }

  onScrollDown() {
    this.NextLoad();
  }

  // Loads more beer by calling API and Increasing maxPerPage
  NextLoad() {
    this.currentPage++;   
    this.beerService.nextBeerLoad();
  }
  
}