import { getAttribute } from '../utils/selectors';
import type { IdenticalToValidationSettings } from '../types';
import { updateMessage, updateStyles } from '../actions';

/**
 * This is an example reusable action.
 */
export const validateUrl = (
  // Elements
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  messageElement: HTMLElement,
  compareTo: HTMLInputElement | HTMLTextAreaElement,
  initialMessage: string
) => {
  // Get all settings
  const form = inputElement.closest('form');
  if (!form) return;

  let errorClass: IdenticalToValidationSettings['errorClass'] = 'is-error';

  let successClass: IdenticalToValidationSettings['successClass'];

  let showSuccessMessage: IdenticalToValidationSettings['showSuccessMessage'] = false;

  let customInvalidMessage: IdenticalToValidationSettings['defaultInvalidMessage'] = 'Invalid URL address';

  let customSuccessMessage: IdenticalToValidationSettings['defaultSuccessMessage'] = 'URL address is valid';

  const validationFunction = () => {
    let errorMessage: string[] = [];
    let successMessage: string = '';

    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (!urlRegex.test(inputElement.value)) {
      errorMessage.push(customInvalidMessage);
    } else {
      successMessage = customSuccessMessage;
    }

    return { errorMessage, successMessage };
  };

  const { errorMessage, successMessage } = validationFunction();

  const isValid: boolean = errorMessage.length === 0;

  updateStyles(isValid, inputElement, messageElement, errorClass, successClass, showSuccessMessage);

  if (!initialMessage) return;
  updateMessage(isValid, errorMessage, successMessage, messageElement, showSuccessMessage, initialMessage);

  return isValid;
};
