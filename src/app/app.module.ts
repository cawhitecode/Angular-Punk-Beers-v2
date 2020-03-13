import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { BeerComponent } from './beer.component';
import { BeerServiceService } from './services/beer-service.service';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { BeerListControlsComponent } from './components/beer-list-controls/beer-list-controls.component';




@NgModule({
  imports:      [ HttpModule, BrowserModule, FormsModule ],
  declarations: [ AppComponent, BeerComponent, BeerListComponent, BeerListControlsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [BeerServiceService]
})
export class AppModule { }
