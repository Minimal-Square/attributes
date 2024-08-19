import { validateEmail, validateUrl } from './actions';
import { getAttribute, getClosestElement } from './utils/selectors';

export const initInputElement = (inputElement: HTMLInputElement | HTMLTextAreaElement) => {
  const form = inputElement.closest('form');

  if (!form) return;
  const validationTrigger = getAttribute(form, 'trigger', true);
  const inputValidationType = getAttribute(inputElement, 'type', true);
  const messageElement = getClosestElement(inputElement, 'helper');

  const initialMessage = messageElement?.textContent;

  if (!initialMessage) return;
  if (!messageElement) return;

  // Add novalidate attribute to the form
  form.setAttribute('novalidate', '');

  let isValid: boolean | undefined;

  const validateInput = () => {
    switch (inputValidationType) {
      case 'phone':
        // validatePhone(inputElement, messageElement);
        break;
      case 'email':
        isValid = validateEmail(inputElement, messageElement, initialMessage);
        break;
      case 'password':
        // validatePassword(inputElement, messageElement);
        break;
      case 'creditCard':
        // validateCreditCard(inputElement, messageElement);
        break;
      case 'url':
        isValid = validateUrl(inputElement, messageElement, initialMessage);
        break;
      case 'regex':
        // validateRegex(inputElement, messageElement);
        break;
      case 'identical':
        // validateIdentical(inputElement, messageElement);
        break;
    }
    return isValid;
  };

  form.addEventListener('submit', (event) => {
    const isValid = validateInput();
    console.log('Form submitted. Validation result:', isValid);
    if (isValid === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  if (validationTrigger === 'blur' || validationTrigger === 'input') {
    inputElement.addEventListener(validationTrigger, () => validateInput());
  }
};
