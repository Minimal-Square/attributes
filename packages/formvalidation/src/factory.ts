import { updateMessage, updateStyles, validateEmail, validateUrl } from './actions';
import { getAttribute, getClosestElement } from './utils/selectors';
import type { BaseValidationElements, BaseValidationSettings, EmailValidationMessages, EmailValidationSettings } from './types';

export const initInputElement = (inputElement: BaseValidationElements['inputElement']) => {
  const form = inputElement.closest('form');

  // Add novalidate attribute to the form
  if (!form) return;
  form.setAttribute('novalidate', '');

  // Default settings
  const settingsBase: BaseValidationSettings = {
    validationTrigger: getAttribute(form, 'trigger', true) || 'submit',
    inputValidationType: getAttribute(inputElement, 'type', true),
    errorClass: getAttribute(form, 'errorclass'),
    successClass: getAttribute(form, 'successclass'),
    showSuccessMessage: Boolean(getAttribute(inputElement, 'showsuccessmessage')) || false,
  };

  const messageElement: BaseValidationElements['messageElement'] = getClosestElement(inputElement, 'helper');

  // Get the initial message from the message element
  const initialMessage = messageElement?.textContent;

  if (!initialMessage) return;
  if (!messageElement) return;

  let errorMessages: string[] = [];
  let isValid: boolean;

  const validateInput = () => {
    switch (settingsBase.inputValidationType) {
      case 'phone':
        // validatePhone(inputElement, messageElement);
        break;
      case 'email':
        const settingsMessage: EmailValidationMessages = {
          invalidError: getAttribute(inputElement, 'invaliderror') || 'Invalid email address',
          maxLengthError: getAttribute(inputElement, 'maxlengtherror') || 'Email address is too long',
          specificDomainError: getAttribute(inputElement, 'specificdomainerror') || 'Email address is not valid',
          successMessage: getAttribute(inputElement, 'successmessage') || 'Email address is valid',
        };

        const settingsEmail: EmailValidationSettings = {
          maxLength: Number(getAttribute(inputElement, 'maxlength')) || 400,
          specificDomains: getAttribute(inputElement, 'specificdomains')?.split(',').filter(Boolean) || [],
          showMultipleErrors: Boolean(getAttribute(inputElement, 'showmultipleerrors')) || false,
        };

        settingsBase.errorClass = getAttribute(inputElement, 'errorclass') || settingsBase.errorClass;
        settingsBase.successClass = getAttribute(inputElement, 'successclass') || settingsBase.successClass;
        settingsBase.showSuccessMessage = Boolean(getAttribute(inputElement, 'showsuccessmessage')) || settingsBase.showSuccessMessage;

        errorMessages = validateEmail({
          inputElement,
          maxLength: settingsEmail.maxLength,
          specificDomains: settingsEmail.specificDomains,
          maxLengthError: settingsMessage.maxLengthError,
          invalidError: settingsMessage.invalidError,
          specificDomainError: settingsMessage.specificDomainError,
        });

        isValid = errorMessages.length === 0;

        updateStyles({
          isValid,
          inputElement,
          messageElement,
          errorClass: settingsBase.errorClass,
          successClass: settingsBase.successClass,
          showSuccessMessage: settingsBase.showSuccessMessage,
        });

        updateMessage({
          isValid,
          errorMessages,
          successMessage: settingsMessage.successMessage,
          messageElement,
          initialMessage,
          showSuccessMessage: settingsBase.showSuccessMessage,
        });

        break;
      case 'password':
        // validatePassword(inputElement, messageElement);
        break;
      case 'creditCard':
        // validateCreditCard(inputElement, messageElement);
        break;
      case 'url':
        // isValid = validateUrl(inputElement, messageElement, initialMessage);
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

  if (settingsBase.validationTrigger === 'blur' || settingsBase.validationTrigger === 'input') {
    inputElement.addEventListener(settingsBase.validationTrigger, () => validateInput());
  }
};
