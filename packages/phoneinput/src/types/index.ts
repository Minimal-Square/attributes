/**
 * Represents the structure of country data.
 */
export interface CountryData {
  name: string;
  flag: string;
  alpha2Code: string;
  callingCode: string;
}

/**
 * Represents the structure of the raw country data from the API.
 */
export interface RawCountryData {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  cca2: string;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}
