import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../../services/beer-service.service';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-beer-modal-more-info',
  templateUrl: './beer-modal-more-info.component.html',
  styleUrls: ['./beer-modal-more-info.component.css']
})
export class BeerModalMoreInfoComponent  {
  @Input()
  // Beer from beers$ service array but comes from beer-list as Beer
    beer: Beer;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})    
    
  }
}
