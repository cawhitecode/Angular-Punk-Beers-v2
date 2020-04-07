import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { BeerComponent } from './beer.component';
import { BeerService } from './services/beer-service.service';
import { BeerListComponent } from './components/beer-list/beer-list.component';

import { BeerEmptyComponent } from './components/beer-empty/beer-empty.component';
import { BeerFiltersComponent } from './components/beer-filters/beer-filters.component';
import { BeerModalMoreInfoComponent } from './components/beer-modal-more-info/beer-modal-more-info.component';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';





@NgModule({
  imports:      [ HttpClientModule, BrowserModule, FormsModule, NgMultiSelectDropDownModule.forRoot(), InfiniteScrollModule, NgbModule ],
  declarations: [ AppComponent, BeerComponent, BeerListComponent, BeerEmptyComponent, BeerFiltersComponent, InfiniteScrollComponent, BeerModalMoreInfoComponent, GoToTopComponent ],
  bootstrap:    [ AppComponent ],
  providers: [BeerService]
})
export class AppModule { }
