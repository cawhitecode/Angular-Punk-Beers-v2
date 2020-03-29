import { Component } from "@angular/core";
import { BeerService } from '../../services/beer-service.service';

@Component({
  selector: 'app-beer-list-page-controls',
  templateUrl: './beer-list-page-controls.component.html',
  styleUrls: ['./beer-list-page-controls.component.css']
})
export class BeerListPageControlsComponent {
  constructor(private beerService: BeerService) {}

  prevPage() {
    this.beerService.prevPage();
  }

  nextPage() {
    this.beerService.nextPage();
  }

}