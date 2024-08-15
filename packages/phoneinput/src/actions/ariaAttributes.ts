import type { CountryData } from '../types';
import { getElementSelector, queryAllElements } from '../utils/selectors';
import { getSelectedItemElement } from '../actions';

export const setAriaAttributes = (dropdownElement: HTMLElement, alpha2CodeElement: HTMLElement, inputElement: HTMLInputElement, listElement: HTMLElement) => {
  if (alpha2CodeElement) {
    alpha2CodeElement.setAttribute('aria-label', 'Phone prefix');
  }

  const arrowIcon = dropdownElement?.querySelector('svg');
  if (arrowIcon?.parentElement) {
    arrowIcon.parentElement.setAttribute('aria-label', 'hidden');
  }

  if (listElement?.parentElement) {
    listElement.parentElement.setAttribute('role', 'listbox');
    listElement.parentElement.setAttribute('aria-multiselectable', 'false');
  }

  if (inputElement) {
    inputElement.setAttribute('aria-label', 'Phone input');
  }
};

export const updateAriaSelected = (selectedData: CountryData, listElement: HTMLElement, phoneInputElement: HTMLElement) => {
  const selectedItemElement = getSelectedItemElement(selectedData, phoneInputElement);

  // Set aria-selected to true for the initially selected item
  if (!selectedItemElement) return;
  selectedItemElement.setAttribute('aria-selected', 'true');

  // Update aria-selected attribute on keydown event
  listElement.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const newSelectedItemElement = getSelectedItemElement(selectedData, phoneInputElement);
      if (newSelectedItemElement) {
        const previousSelected = listElement.querySelector('[aria-selected="true"]');
        if (previousSelected) {
          previousSelected.setAttribute('aria-selected', 'false');
        }
        newSelectedItemElement.setAttribute('aria-selected', 'true');
      }
    }
  });

  // Update aria-selected attribute on click event
  listElement.addEventListener('click', (event) => {
    const clickedItem = (event.target as HTMLElement).closest(getElementSelector('item'));
    if (clickedItem) {
      const previousSelected = listElement.querySelector('[aria-selected="true"]');
      if (previousSelected) {
        previousSelected.setAttribute('aria-selected', 'false');
      }
      clickedItem.setAttribute('aria-selected', 'true');
    }
  });
};
