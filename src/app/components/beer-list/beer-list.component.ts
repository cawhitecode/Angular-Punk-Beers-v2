import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeerService, Beer } from '../../services/beer-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent {
  beers$: Observable<Beer[]>;

  constructor(beerService: BeerService) {
    // Beers array from service
    this.beers$ = beerService.beers$;
  }
}

