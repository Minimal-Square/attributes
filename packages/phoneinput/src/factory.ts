import { getElementSelector, queryElement, queryAllElements, getClosestElement } from './utils/selectors';
import {
  getCountries,
  getUserLocation,
  getUserCountryData,
  setInitialCountry,
  populateCountriesList,
  updateDropdownData,
  countrySearch,
  focusSelectedOption,
  setAriaAttributes,
  updateAriaSelected,
  getSelectedItemElement,
  keyboardNavigation,
} from './actions';
import { closeDropdown, CURRENT_CSS_CLASS } from '@finsweet/ts-utils';
import type { CountryData } from './types';

// Get the user's location
const userLocation = await getUserLocation();

// Get all the countries
const countries = await getCountries();

// Get the user's country data based on the user's location
const userCountryData = await getUserCountryData(userLocation, countries);

export const initPhoneInputElement = (phoneInputElement: HTMLElement) => {
  // Get elements inside the phone input element
  const flagElement = queryElement('flag', phoneInputElement) as HTMLImageElement;
  const listElement = queryElement('list', phoneInputElement);
  const itemElement = queryElement('item', phoneInputElement);
  const callingCodeElement = queryElement('value', phoneInputElement);
  const hiddenInputElement = phoneInputElement.parentElement?.querySelector('input[type="hidden"]') as HTMLInputElement;
  const inputElement = phoneInputElement.parentElement?.querySelector('input[type="tel"]') as HTMLInputElement;
  const dropdownToggleElement = phoneInputElement.firstElementChild as HTMLDivElement;

  // Initialize the selectedData object with the user's country data based on the user's location
  let selectedData: CountryData = {
    flag: userCountryData.flag,
    callingCode: userCountryData.callingCode,
    name: userCountryData.name,
    alpha2Code: userCountryData.alpha2Code,
  };

  // Set the initial country data based on the user's location
  if (!callingCodeElement) return;
  setInitialCountry(flagElement, callingCodeElement, userCountryData.flag, userCountryData.callingCode, userCountryData.name);

  // Populate the dropdown list with the countries
  if (!itemElement) return;
  populateCountriesList(itemElement, countries);

  // Add w--current to the initial selected item
  const initialSelectedItem = getSelectedItemElement(selectedData, phoneInputElement);

  const selectedIcon = queryElement('selected', initialSelectedItem) as HTMLElement;
  if (selectedIcon) selectedIcon.style.display = 'block';

  // Listen for country selection
  listElement?.addEventListener('click', (event) => {
    const selectedItem = (event.target as HTMLElement).closest(getElementSelector('item')) as HTMLElement;

    const selectedAlpha2CodeElement = queryElement('value', selectedItem) as HTMLElement;
    const selectedAlpha2Code = selectedAlpha2CodeElement?.textContent;

    const currentSelectedItem = getSelectedItemElement(selectedData, phoneInputElement);

    // Remove display from previously selected item icon
    if (currentSelectedItem) {
      const previousSelectedIcon = currentSelectedItem.querySelector(getElementSelector('selected')) as HTMLElement;
      if (previousSelectedIcon) previousSelectedIcon.style.display = 'none';
    }

    // Display the icon for the newly selected item
    if (selectedItem) {
      const newSelectedIcon = selectedItem.querySelector(getElementSelector('selected')) as HTMLElement;
      if (newSelectedIcon) newSelectedIcon.style.display = 'block';
    }

    // Based on the selected country, find the corresponding country data
    if (!selectedAlpha2Code) return;
    const selectedCountry = countries.find((country) => country.alpha2Code === selectedAlpha2Code);

    // Update the selectedData object with the selected country data
    if (!selectedCountry) return;
    selectedData = {
      flag: selectedCountry.flag,
      callingCode: selectedCountry.callingCode,
      name: selectedCountry.name,
      alpha2Code: selectedCountry.alpha2Code,
    };

    // Update the dropdown data with the selected country data
    updateDropdownData(flagElement, callingCodeElement, selectedData.flag, selectedData.callingCode);

    // Set the hidden input value
    hiddenInputElement.value = selectedData.callingCode;

    // Close the dropdown when a country is selected
    closeDropdown(dropdownToggleElement, true);
  });

  // Initialize country search feature when dropdown is open
  if (!listElement) return;
  phoneInputElement.addEventListener('keydown', (event) => {
    countrySearch(event, countries, listElement);
  });

  // Keyboard navigation for dropdown toggle
  dropdownToggleElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dropdownToggleElement.click();
    }
  });

  // Focus the selected option when opening the dropdown with mouse click
  dropdownToggleElement.addEventListener('click', () => {
    focusSelectedOption(listElement, countries, selectedData, phoneInputElement);
  });

  // Focus the selected option when opening the dropdown with the space key
  dropdownToggleElement.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      focusSelectedOption(listElement, countries, selectedData, phoneInputElement);
    }
  });

  // Keyboard navigation for dropdown list
  keyboardNavigation(listElement, dropdownToggleElement);

  // Setup aria attributes
  setAriaAttributes(dropdownToggleElement, callingCodeElement, inputElement, listElement);

  // Update the aria selected attribute
  updateAriaSelected(selectedData, listElement, phoneInputElement);
};
