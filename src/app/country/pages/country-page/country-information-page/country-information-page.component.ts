import { Component, input, signal } from '@angular/core';
import { Country } from '../../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'country-information-page',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-information-page.component.html',
})
export class CountryInformationPageComponent {
  country =  input.required<Country>();
  today = new Date();

  countStars = (population: number) => {
    let count: number[];
    if (population < 1_000_000) {
      return count = [1];
    } else if (population >= 1_000_000 && population < 10_000_000 ) {
      return  count =[1,1];
    } else if (population >= 10_000_000 && population < 50_000_000 ) {
      return count = [1,1,1];
    } else if (population >= 50_000_000 && population < 100_000_000 ) {
      return count = [1,1,1,1];
    } else if (population >= 100_000_000) {
      return count = [1,1,1,1,1];
    }
    return count = [];
  }

}
