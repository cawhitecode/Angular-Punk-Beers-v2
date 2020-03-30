import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer-service.service';


@Component({
  selector: 'app-beer-empty',
  templateUrl: './beer-empty.component.html',
  styleUrls: ['./beer-empty.component.css']
})
export class BeerEmptyComponent implements OnInit {

  constructor(private beerService: BeerService) {}

  ngOnInit() {
  }
  homePage() {
    this.beerService.homePage();
  }
}