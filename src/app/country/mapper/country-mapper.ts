import { Country } from "../interfaces/country.interfaces";
import { RESTCountry } from "../interfaces/rest-coutries.interfaces";

export class CountryMapper {

  static restCountryToCountry(item: RESTCountry): Country {
    return {
      cca2:item.cca2,
      capital: item.capital?.join(',') ?? 'No capital',
      flag: item.flag,
      name: item.translations['spa'].official ?? 'No Spanish name',
      population: item.population,
      svg: item.flags.svg,
      area: item.area,
      status: item.status,
      region: item.region,
      subregion: item.subregion,
      altSpellings: item.altSpellings
    };
  }

  static restCountryToCountryArray(items: RESTCountry[]): Country[] {
    return items.map(this.restCountryToCountry);
  }

}
