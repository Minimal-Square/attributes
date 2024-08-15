import type { CountryData } from '../types';
import { getSelectedItemElement } from './getSelectedItemElement';

// Function to focus the currently selected option when opening the dropdown
export const focusSelectedOption = (listElement: HTMLElement, countries: CountryData[], selectedData: CountryData, phoneInputElement: HTMLElement) => {
  if (!listElement) return;

  const selectedItem = getSelectedItemElement(selectedData, phoneInputElement);

  // Use setTimeout to ensure the dropdown is fully open before focusing and scrolling
  setTimeout(() => {
    if (!selectedItem) return;
    selectedItem.focus();
    selectedItem.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, 0);
};
