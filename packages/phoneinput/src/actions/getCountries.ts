import type { CountryData, RawCountryData } from '../types/';

/**
 * Fetch all countries from the restcountries.com API
 */
export const getCountries = async (): Promise<CountryData[]> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: RawCountryData[] = await response.json();

    return data
      .filter(isValidCountryData)
      .map(mapToCountryData)
      .sort((a, b) => a.alpha2Code.localeCompare(b.alpha2Code));
  } catch (error) {
    console.error('Error fetching country data:', error);
    return [];
  }
};

const isValidCountryData = (country: RawCountryData): boolean => {
  return !!(country.name?.common && country.flags?.svg && country.cca2 && country.idd?.root && country.idd?.suffixes?.[0]);
};

const mapToCountryData = (country: RawCountryData): CountryData => {
  return {
    name: country.name.common,
    flag: country.flags.svg,
    alpha2Code: country.cca2,
    callingCode: `${country.idd!.root}${country.idd!.suffixes![0]}`,
  };
};
