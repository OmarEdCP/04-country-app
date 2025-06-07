import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IsLoadingComponent } from '../../../shared/components/is-loading/is-loading.component';

@Component({
  selector: 'country-list',
  imports: [
    DecimalPipe, RouterLink, IsLoadingComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent {

  countries = input.required<Country[]>();

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
