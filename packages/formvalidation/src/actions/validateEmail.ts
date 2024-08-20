import type { EmailValidation } from '../types';

/**
 * Validates an email address.
 * @param inputElement - The input element to validate.
 * @param maxLength - The maximum length of the email address.
 * @param specificDomains - An array of specific domains to validate against.
 * @param maxLengthError - The error message to show if the email address is too long.
 * @param invalidError - The error message to show if the email address is invalid.
 * @param specificDomainError - The error message to show if the email address is not valid for the specific domains.
 * @returns An array of error messages.
 */
export const validateEmail: EmailValidation = ({ inputElement, maxLength, specificDomains, maxLengthError, invalidError, specificDomainError }) => {
  let errorMessages: string[] = [];

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  if (!emailRegex.test(inputElement.value)) {
    errorMessages.push(invalidError);
  }

  if (inputElement.value.length > maxLength) {
    if (maxLengthError) {
      errorMessages.push(maxLengthError);
    }
  }

  if (specificDomains.length > 0 && !specificDomains.includes(inputElement.value.split('@')[1])) {
    if (specificDomainError) {
      errorMessages.push(specificDomainError);
    }
  }

  return errorMessages;
};
