import { Component, Input } from '@angular/core';

@Component({
  selector: 'beer',
  template: `<h1> {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class BeerComponent  {
  @Input() name: string;
}
