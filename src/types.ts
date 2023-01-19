interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

// is  this the right pattern  ?
export interface ICountryFullDetail extends ICountryDetail {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  languages: Language[];
  currencies: Currency[];
  borders?: string[];
  borderCountriesName?: string[];
}

export interface ICountryDetail {
  name?: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

export interface LooseObject {
  [key: string]: any;
}
