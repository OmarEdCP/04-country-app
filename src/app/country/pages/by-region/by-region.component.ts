import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { RESTCountry } from '../../interfaces/rest-coutries.interfaces';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { Region } from '../../interfaces/region.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam:string): Region{
const validRegions: Record<string,Region> ={
    africa:'Africa',
    america:'Americas',
    asia:'Asia',
    europe:'Europe',
    oceania:'Oceania',
    antarctic:'Antarctic',
}
return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region',
  imports: [ListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent {
   public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]);
      this.route.navigate(['/country/by-region'],{
        queryParams:{
          query: request.query
        },
      });
      return this.countryService.searchByRegion(request.query);
    }
    });

}
