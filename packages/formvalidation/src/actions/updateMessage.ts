/**
 * This is an example reusable action.
 */
export const updateMessage = (
  isValid: boolean,
  errors: string[],
  successMessage: string,
  messageElement: HTMLElement,
  showSuccessMessage: boolean = true,
  initialMessage: string,
  showMultipleErrorMessages?: boolean
) => {
  if (isValid) {
    if (showSuccessMessage) {
      messageElement.textContent = successMessage;
    } else {
      messageElement.textContent = initialMessage;
    }
  } else {
    if (showMultipleErrorMessages) {
      messageElement.innerHTML = errors.join('<br>');
    } else {
      messageElement.textContent = errors[0];
    }
  }
};
