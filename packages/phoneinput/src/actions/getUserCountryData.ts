import type { CountryData } from '../types';

export const getUserCountryData = async (alpha2Code: string, countries: CountryData[]): Promise<CountryData> => {
  const country = countries.find((country) => country.alpha2Code === alpha2Code);
  if (!country) {
    throw new Error(`Country with alpha2 code ${alpha2Code} not found`);
  }

  const name = country.name;
  const flag = country.flag;
  const callingCode = country.callingCode;

  return { name, flag, callingCode, alpha2Code };
};
