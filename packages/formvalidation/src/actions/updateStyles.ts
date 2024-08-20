import type { UpdateStyles } from '../types';

/**
 * Updates the styles of input and message elements based on validation result.
 * @param isValid - The validation result.
 * @param inputElement - The input element.
 * @param messageElement - The message element.
 * @param errorClass - The class to add if the input is invalid.
 * @param successClass - The class to add if the input is valid.
 * @param showSuccessMessage - Whether to show the success message.
 */
export const updateStyles: UpdateStyles = ({ isValid, inputElement, messageElement, errorClass, successClass, showSuccessMessage }) => {
  if (errorClass) {
    if (isValid) {
      inputElement.classList.remove(errorClass);
      if (messageElement) messageElement.classList.remove(errorClass);
      if (successClass) {
        inputElement.classList.add(successClass);
        if (showSuccessMessage && messageElement) {
          messageElement.classList.add(successClass);
        }
      }
    } else {
      inputElement.classList.add(errorClass);
      if (messageElement) messageElement.classList.add(errorClass);
      if (successClass) {
        inputElement.classList.remove(successClass);
        if (showSuccessMessage && messageElement) {
          messageElement.classList.remove(successClass);
        }
      }
    }
  }
};
