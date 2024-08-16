import { getSettingAttributeName } from '../utils/selectors';

/**
 * Get the main checkbox of the group
 * @param groupName - The value of attribute name
 * @param form - The form element containing the checkbox group
 * @returns The main checkbox of the group or null if not found
 */
export const getGroupCheckboxes = (groupName: string, form: HTMLFormElement): HTMLInputElement[] | null => {
  const groupSelector = getSettingAttributeName('group');
  const groupWrapper = form.parentElement?.querySelector(`[${groupSelector}="${groupName}"]`) as HTMLElement;

  if (!groupWrapper) {
    return null;
  }

  const groupCheckboxes = Array.from(groupWrapper.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));

  return groupCheckboxes.length > 0 ? groupCheckboxes : null;
};

export const getMainCheckboxes = (groupName: string, form: HTMLFormElement): HTMLInputElement[] => {
  const allCheckboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  const groupSelector = getSettingAttributeName('group');
  const mainCheckboxes: HTMLInputElement[] = [];

  for (const checkbox of allCheckboxes) {
    let parent = checkbox.parentElement;
    let isMainCheckbox = true;
    while (parent) {
      if (parent.hasAttribute(groupSelector)) {
        isMainCheckbox = false;
        break;
      }
      parent = parent.parentElement;
    }
    if (isMainCheckbox) {
      mainCheckboxes.push(checkbox);
    }
  }

  return mainCheckboxes;
};
