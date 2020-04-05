import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../../services/beer-service.service';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BeerService } from '../../services/beer-service.service';

@Component({
  selector: 'app-beer-modal-more-info',
  templateUrl: './beer-modal-more-info.component.html',
  styleUrls: ['./beer-modal-more-info.component.css']
})
export class BeerModalMoreInfoComponent  {
  @Input()
    beer: Beer;

  constructor(private modalService: NgbModal, private beerService: BeerService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})    
    
  }
}
