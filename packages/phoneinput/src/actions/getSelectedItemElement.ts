import type { CountryData } from '../types';
import { getElementSelector, queryAllElements, queryElement } from '../utils/selectors';

export const getSelectedItemElement = (selectedData: CountryData, phoneInputElement: HTMLElement) => {
  const listElement = queryElement('list', phoneInputElement);

  if (!listElement) return;
  const listItems = queryAllElements('item', listElement);

  if (!listItems) return;
  const selectedItemElement = listItems.find((item) => item.querySelector(getElementSelector('value'))?.textContent === selectedData.alpha2Code);

  return selectedItemElement;
};
