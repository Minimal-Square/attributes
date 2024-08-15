import { cloneNode } from '@finsweet/ts-utils';
import type { CountryData } from '../types';
import { queryElement } from '../utils/selectors';

/**
 * This function performs the following steps:
 * - Clones the template item element.
 * - Creates new item for each country in the countries array.
 * - Populates each new item with the corresponding country data.
 * - Appends the newly created items to the list.
 * - Removes the original template item element.
 */
export const populateCountriesList = (
  itemElement: HTMLElement,

  countries: CountryData[]
): void => {
  const listElement = itemElement.parentElement;

  // Clone item element and populate list
  countries.forEach((country) => {
    const newItem = cloneNode(itemElement, true);

    newItem.setAttribute('aria-selected', 'false');

    const newItemFlagElement = queryElement('flag', newItem) as HTMLImageElement;
    const newItemAlpha2CodeElement = queryElement('value', newItem) as HTMLElement;

    setCountryItemData(newItemFlagElement, newItemAlpha2CodeElement, country);

    if (!listElement) return;
    listElement.appendChild(newItem);
  });

  itemElement.remove();
};

const setCountryItemData = (itemFlagElement: HTMLImageElement, itemAlpha2CodeElement: HTMLElement, country: CountryData): void => {
  if (itemFlagElement) {
    itemFlagElement.src = country.flag;
    itemFlagElement.alt = `${country.name} flag`;
  }

  if (itemAlpha2CodeElement) itemAlpha2CodeElement.textContent = country.alpha2Code;
};
