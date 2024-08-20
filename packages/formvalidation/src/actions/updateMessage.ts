import type { UpdateMessage } from '../types';

/**
 * Updates the message of input and message elements based on validation result.
 * @param isValid - Whether the input is valid.
 * @param errorMessages - The error messages.
 * @param successMessage - The success message.
 * @param messageElement - The message element.
 * @param showSuccessMessage - Whether to show the success message.
 * @param initialMessage - The initial message.
 * @param showMultipleErrorMessages - Whether to show multiple error messages.
 */
export const updateMessage: UpdateMessage = ({
  isValid,
  errorMessages,
  successMessage,
  messageElement,
  showSuccessMessage,
  initialMessage,
  showMultipleErrorMessages,
}) => {
  if (!messageElement) return;
  if (isValid) {
    if (showSuccessMessage) {
      messageElement.textContent = successMessage;
    } else {
      messageElement.textContent = initialMessage;
    }
  } else {
    if (showMultipleErrorMessages) {
      messageElement.innerHTML = errorMessages.join('<br>');
    } else {
      messageElement.textContent = errorMessages[0];
    }
  }
};
