import { getAttribute } from '../utils/selectors';
import type { EmailValidationSettings } from '../types';
import { updateMessage, updateStyles } from '../actions';

/**
 * This is an example reusable action.
 */
export const validateEmail = (
  // Elements
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  messageElement: HTMLElement,
  initialMessage: string
) => {
  // Get all settings
  const form = inputElement.closest('form');
  if (!form) return;

  // Define default for optional parameters
  let maxLength: EmailValidationSettings['maxLength'] = 400;
  maxLength = Number(getAttribute(inputElement, 'maxlength')) || maxLength;

  let specificDomains: EmailValidationSettings['specificDomains'] = [];
  specificDomains = getAttribute(inputElement, 'specificdomains')?.split(',') || specificDomains;

  let errorClass: EmailValidationSettings['errorClass'] = 'is-error';
  errorClass = getAttribute(form, 'errorclass') || errorClass;

  let successClass: EmailValidationSettings['successClass'];
  successClass = getAttribute(form, 'successclass');

  let showMultipleErrorMessages: EmailValidationSettings['showMultipleErrorMessages'] = false;
  showMultipleErrorMessages = Boolean(getAttribute(inputElement, 'showmultipleerrors')) || showMultipleErrorMessages;

  let showSuccessMessage: EmailValidationSettings['showSuccessMessage'] = false;
  showSuccessMessage = Boolean(getAttribute(inputElement, 'showsuccessmessage')) || showSuccessMessage;

  let defaultInvalidMessage: EmailValidationSettings['defaultInvalidMessage'] = 'Invalid email address';
  const customInvalidMessage = getAttribute(inputElement, 'invaliderror');
  defaultInvalidMessage = customInvalidMessage ?? defaultInvalidMessage;

  let defaultMaxLengthMessage: EmailValidationSettings['defaultMaxLengthMessage'] = `Email must not exceed ${maxLength} characters.`;
  const customMaxLengthMessage = getAttribute(inputElement, 'maxlengtherror');
  defaultMaxLengthMessage = customMaxLengthMessage ?? defaultMaxLengthMessage;

  let defaultSpecificDomainMessage: EmailValidationSettings['defaultSpecificDomainMessage'] = `Email must be from one of the following domains: ${specificDomains}.`;
  const customSpecificDomainMessage = getAttribute(inputElement, 'specificdomainerror');
  defaultSpecificDomainMessage = customSpecificDomainMessage ?? defaultSpecificDomainMessage;

  let defaultSuccessMessage: EmailValidationSettings['defaultSuccessMessage'] = 'Email address is valid';
  const customSuccessMessage = getAttribute(inputElement, 'successmessage');
  defaultSuccessMessage = customSuccessMessage ?? defaultSuccessMessage;

  const validationFunction = () => {
    let errorMessage: string[] = [];
    let successMessage: string = '';

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

    if (!emailRegex.test(inputElement.value)) {
      errorMessage.push(defaultInvalidMessage);
    } else {
      successMessage = defaultSuccessMessage;
    }

    if (inputElement.value.length > maxLength) {
      errorMessage.push(defaultMaxLengthMessage);
    }

    if (specificDomains.length > 0 && !specificDomains.includes(inputElement.value.split('@')[1])) {
      errorMessage.push(defaultSpecificDomainMessage);
    }

    return { errorMessage, successMessage };
  };

  const { errorMessage, successMessage } = validationFunction();

  const isValid: boolean = errorMessage.length === 0;

  updateStyles(isValid, inputElement, messageElement, errorClass, successClass, showSuccessMessage);

  if (!initialMessage) return;
  updateMessage(isValid, errorMessage, successMessage, messageElement, showSuccessMessage, initialMessage, showMultipleErrorMessages);

  return isValid;
};
