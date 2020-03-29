import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { BeerComponent } from './beer.component';
import { BeerService } from './services/beer-service.service';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { BeerListPageControlsComponent } from './components/beer-list-page-controls/beer-list-page-controls.component';
import { BeerEmptyComponent } from './components/beer-empty/beer-empty.component';
import { BeerFiltersComponent } from './components/beer-filters/beer-filters.component';




@NgModule({
  imports:      [ HttpClientModule, BrowserModule, FormsModule, NgMultiSelectDropDownModule.forRoot() ],
  declarations: [ AppComponent, BeerComponent, BeerListComponent, BeerListPageControlsComponent, BeerEmptyComponent, BeerFiltersComponent ],
  bootstrap:    [ AppComponent ],
  providers: [BeerService]
})
export class AppModule { }
