import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';
import { Country } from './../interfaces/country.interfaces';
import { RESTCountry } from '../interfaces/rest-coutries.interfaces';
import { Region } from '../interfaces/region.interfaces';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();

  private queryCacheCountry = new Map<string, Country[]>();

  private queryCacheRegion = new Map<Region, Country[]>();

  cuantity = signal<number>(0);

  changeCuantity = computed(() => this.cuantity());

  searchByCapital(query: string): Observable<Country[]> {

    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(

      tap((resp) => this.cuantity.set(resp.length)),

      delay(3000),

      map((items) => CountryMapper.restCountryToCountryArray(items)),

      tap(countries => this.queryCacheCapital.set(query,countries)),

      catchError(error => {

        console.log('Error fetching', error);

        return throwError(() => new Error('No se pudo obtener los países'))

      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {

    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {

      return of(this.queryCacheCountry.get(query) ?? []);

    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(

      map((items) => CountryMapper.restCountryToCountryArray(items)),

      tap(countries => this.queryCacheCountry.set(query, countries)),

      delay(3000),

      catchError(error => {

        console.log('Error fetching', error);

        return throwError(() => new Error('No se pudo obtener la información'))
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {

    if (this.queryCacheRegion.has(region)) {

      return of(this.queryCacheRegion.get(region) ?? [])

    }

        console.log(`Llegando al servidor por ${API_URL}/region/${region}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(

      map((regions) => CountryMapper.restCountryToCountryArray(regions)),

      tap(regions => this.queryCacheRegion.set(region,regions)),

      delay(3000),

      catchError( error => {

        console.log('Error fectching', error);

        return throwError(() => new Error('No se pudo obtener la información'));

      }),

    );

  }

  searchCountryByAlphaCode(code: string){

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(

      map((items) => CountryMapper.restCountryToCountryArray(items)),

      map(countries => countries.at(0)),

      catchError(error => {

        console.log('Error fetching', error);

        return throwError(() => new Error('No se pudo obtener la información'))
      })
    );
  }

}
