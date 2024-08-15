import { queryElement } from './utils/selectors';

export const initPasswordVisibilityElement = (passwordElement: HTMLElement) => {
  const showElement = queryElement('show', passwordElement);
  const hideElement = queryElement('hide', passwordElement);
  const inputElement = passwordElement.querySelector<HTMLInputElement>('input[type="password"]');
  const showHideButton = showElement?.parentElement;

  // Check if showHideButton is a button
  if (showHideButton && showHideButton.tagName !== 'BUTTON') {
    showHideButton?.setAttribute('role', 'button');
  }

  // Aria attributes
  hideElement?.setAttribute('aria-hidden', 'true');
  showElement?.setAttribute('aria-hidden', 'true');

  // Event listeners
  if (!showElement || !inputElement || !hideElement) return;
  showElement.addEventListener('click', () => {
    inputElement.type = 'text';
    hideElement.style.display = 'block';
    showElement.style.display = 'none';
  });

  hideElement.addEventListener('click', () => {
    inputElement.type = 'password';
    hideElement.style.display = 'none';
    showElement.style.display = 'block';
  });
};
