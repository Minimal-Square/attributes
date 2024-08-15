import type { CountryData } from '../types';
import { queryAllElements, queryElement } from '../utils/selectors';

// This function handles country search functionality in a dropdown list
export const countrySearch = (event: KeyboardEvent, countries: CountryData[], listElement: HTMLElement) => {
  // Check if event.key is a letter
  if (!/^[a-zA-Z]$/.test(event.key)) {
    return;
  }

  // Initialize buffer if it doesn't exist
  let buffer = (listElement as any).buffer || '';

  // Append the pressed key to the buffer
  buffer += event.key;

  // Store the updated buffer back in the listElement
  if (buffer.length < 2) {
    (listElement as any).buffer = buffer;
  } else {
    (listElement as any).buffer = '';
  }

  // Reset buffer after 2000ms of inactivity
  clearTimeout((listElement as any).bufferResetTimer);
  (listElement as any).bufferResetTimer = setTimeout(() => {
    (listElement as any).buffer = '';
  }, 2000);

  let filteredCountries = countries.find((country) => {
    const value = country.alpha2Code.toLowerCase();
    return value.startsWith(buffer.toLowerCase());
  });

  // If no country is found with 2 characters, try with 1 character
  if (!filteredCountries && buffer.length === 2) {
    filteredCountries = countries.find((country) => {
      const value = country.alpha2Code.toLowerCase();
      return value.startsWith(buffer[0].toLowerCase());
    });
  }

  if (filteredCountries) {
    const countryElements = queryAllElements('item', listElement);
    countryElements.forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });

    const matchedElement = countryElements.find((element) => {
      const alpha2CodeElement = queryElement('value', element);
      return alpha2CodeElement?.textContent === filteredCountries.alpha2Code;
    });

    if (matchedElement) {
      matchedElement.setAttribute('tabindex', '0');
      matchedElement.focus();
    }
  }
};
