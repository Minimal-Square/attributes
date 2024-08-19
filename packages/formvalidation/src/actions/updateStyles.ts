/**
 * This is an example reusable action.
 */
export const updateStyles = (
  isValid: boolean,
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  messageElement: HTMLElement,
  errorClass?: string,
  successClass?: string,
  showSuccessMessage?: boolean
) => {
  if (errorClass) {
    if (isValid) {
      inputElement.classList.remove(errorClass);
      messageElement.classList.remove(errorClass);
      if (successClass) {
        inputElement.classList.add(successClass);
        if (showSuccessMessage) {
          messageElement.classList.add(successClass);
        }
      }
    } else if (!isValid) {
      inputElement.classList.add(errorClass);
      messageElement.classList.add(errorClass);
      if (successClass) {
        inputElement.classList.remove(successClass);
        if (showSuccessMessage) {
          messageElement.classList.remove(successClass);
        }
      }
    }
  }
};
