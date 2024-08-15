import { getElementSelector } from '../utils/selectors';
import { closeDropdown } from '@finsweet/ts-utils';

export const keyboardNavigation = (listElement: HTMLElement, dropdownToggleElement: HTMLDivElement) => {
  // Keyboard navigation for dropdown list
  listElement.addEventListener('keydown', (event) => {
    const items = Array.from(listElement.querySelectorAll(getElementSelector('item')));
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < items.length - 1) {
          (items[currentIndex + 1] as HTMLElement).focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          (items[currentIndex - 1] as HTMLElement).focus();
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        (document.activeElement as HTMLElement).click();
        break;
      case 'Escape':
        event.preventDefault();
        closeDropdown(dropdownToggleElement, true);
        dropdownToggleElement.focus();
        break;
      case 'Tab':
        event.preventDefault();
        closeDropdown(dropdownToggleElement, true);
        break;
    }
  });
};
