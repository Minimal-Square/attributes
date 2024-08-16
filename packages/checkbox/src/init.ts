import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements, getSettingAttributeName } from './utils/selectors';
import { initCheckboxElement } from './factory';

// This function initializes the checkbox functionality
export const init: MuiAttributeInit = async () => {
  // Wait for Webflow to be ready before proceeding
  await waitWebflowReady();

  // Query all elements with the 'checkbox' attribute
  const checkboxElements = queryAllElements('checkbox');
  // Get the attribute name for the 'group' setting
  const groupSelector = getSettingAttributeName('group');

  // Filter out the main checkboxes (those not inside a group)
  const mainCheckboxes = checkboxElements.filter((element) => {
    const checkbox = element.querySelector<HTMLInputElement>('input[type="checkbox"]');
    return checkbox && !checkbox.closest(`[${groupSelector}]`);
  });

  // Iterate over each main checkbox
  mainCheckboxes.forEach((mainCheckbox) => {
    // Get the name attribute of the checkbox input
    const checkboxName = mainCheckbox.querySelector<HTMLInputElement>('input[type="checkbox"]')?.getAttribute('name');

    if (checkboxName) {
      // If the checkbox has a name, look for a group with the same name
      const groupWrapper = document.querySelector(`[${groupSelector}="${checkboxName}"]`);

      if (groupWrapper) {
        // If a group is found, get all checkboxes in the group
        const groupCheckboxes = Array.from(groupWrapper.querySelectorAll<HTMLElement>('input[type="checkbox"]'));
        // Initialize the checkbox with its group
        initCheckboxElement(mainCheckbox, groupCheckboxes);
      } else {
        // If no group is found, initialize the checkbox without a group
        initCheckboxElement(mainCheckbox);
      }
    } else {
      // If the checkbox has no name, initialize it without a group
      initCheckboxElement(mainCheckbox);
    }
  });

  // Return an empty object (required by MuiAttributeInit type)
  return {};
};
