import { Component, OnInit } from '@angular/core';
import { BeerServiceService } from '../../services/beer-service.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  filter: number = 0;

  beers: any[];

  constructor(private beerService: BeerServiceService) { }

  ngOnInit() {
    this.UpdateFilter();
    this.UpdatePage();
  }

  // updates
  UpdatePage(page?: number) {
    this.beerService.GetBeersPage(page, this.filter)
      .subscribe(beers => this.beers = beers);
  }
  UpdateFilter(changeFilter?: number){
    this.filter = changeFilter;
  }
}
