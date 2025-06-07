import { Component, inject, linkedSignal, signal } from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-by-capital-page',

  imports: [SearchInputComponent, ListComponent],

  templateUrl: './by-capital-page.component.html',

})

//* CON OBSERVABLES
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);

  route = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({

    request: () => ({ query: this.query() }),

    loader: ({request}) => {

      if(!request.query) return of([]);

      this.route.navigate(['/country/by-capital'],{
        queryParams: {
          query: request.query,
        },
      })

      return this.countryService.searchByCapital(request.query);

    }

  });

    //* CON PROMESAS
// export class ByCapitalPageComponent {
//   countryService = inject(CountryService);
//   query = signal<string>('');
//   countryResource = resource({
//     request: () => ({ query: this.query() }),
//     loader: async({request}) => {
//       if(!request.query) return [];
//       return await firstValueFrom( this.countryService.searchByCapital(request.query))
//     }
//     });

    //* CON SUBSCRIBE
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onChange(query:string){
  // if(this.isLoading()) return;

  // this.isLoading.set(true);
  // this.isError.set(null);

  // this.countryService.searchByCapital(query).subscribe(
  //   {
  //     next: (countries) => {
  //     this.isLoading.set(false);
  //     this.countries.set(countries);
  //   },
  //     error: (err) => {
  //       this.isLoading.set(true);
  //       this.countries.set([]);
  //       this.isError.set(`No se encontró un país con capital ${query}`)
  //     },
  //   });
  // }
 }
