import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { RESTCountry } from '../../interfaces/rest-coutries.interfaces';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country.component.html',
})
export class ByCountryComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);
  countrySrc = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.route.navigate(['/country/by-country'],
        {
          queryParams:{
            query: request.query,
          },
        },
      );
      return this.countryService.searchByCountry(request.query);
    }
  })

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onChange(query:string){
  // if(this.isLoading()) return;

  // this.isLoading.set(true);
  // this.isError.set(null);

  // this.countryService.searchByCapital(query).subscribe(
  //   (countries) => {
  //     this.isLoading.set(false);
  //     this.countries.set(countries);
  //   }
  // )
  // }
}
