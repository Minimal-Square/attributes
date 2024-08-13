import { getAttribute } from './utils/selectors';

export const initComboboxElement = (comboboxElement: HTMLElement) => {
  // Get the date on the element

  const date = new Date(comboboxElement.innerText);

  const locale = getAttribute(comboboxElement, 'locale', true);
  const year = getAttribute(comboboxElement, 'year', true);

  const formatted = new Intl.DateTimeFormat(locale, { year }).format(date);

  comboboxElement.innerHTML = formatted;
};
