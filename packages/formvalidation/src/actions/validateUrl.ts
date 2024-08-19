import { getAttribute } from '../utils/selectors';
import type { UrlValidationSettings } from '../types';
import { updateMessage, updateStyles } from '../actions';

/**
 * This is an example reusable action.
 */
export const validateUrl = (
  // Elements
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  messageElement: HTMLElement,
  initialMessage: string
) => {
  // Get all settings
  const form = inputElement.closest('form');
  if (!form) return;

  // Define default for optional parameters
  let errorClass: UrlValidationSettings['errorClass'] = 'is-error';
  errorClass = getAttribute(form, 'errorclass') || errorClass;

  let successClass: UrlValidationSettings['successClass'];
  successClass = getAttribute(form, 'successclass');

  let showSuccessMessage: UrlValidationSettings['showSuccessMessage'] = false;
  showSuccessMessage = Boolean(getAttribute(inputElement, 'showsuccessmessage')) || showSuccessMessage;

  let defaultInvalidMessage: UrlValidationSettings['defaultInvalidMessage'] = 'Invalid URL address';
  const customInvalidMessage = getAttribute(inputElement, 'invaliderror');
  defaultInvalidMessage = customInvalidMessage ?? defaultInvalidMessage;

  let defaultSuccessMessage: UrlValidationSettings['defaultSuccessMessage'] = 'URL address is valid';
  const customSuccessMessage = getAttribute(inputElement, 'successmessage');
  defaultSuccessMessage = customSuccessMessage ?? defaultSuccessMessage;

  const validationFunction = () => {
    let errorMessage: string[] = [];
    let successMessage: string = '';

    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (!urlRegex.test(inputElement.value)) {
      errorMessage.push(defaultInvalidMessage);
    } else {
      successMessage = defaultSuccessMessage;
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
