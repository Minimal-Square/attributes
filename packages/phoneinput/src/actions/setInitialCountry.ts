/**
 * Set the initial country for the phone input
 * @param flagElement - The flag element
 * @param alpha2CodeElement - The alpha2 code element
 * @param flagValue - The flag value
 * @param alpha2CodeValue
 */
export const setInitialCountry = (
  flagElement: HTMLImageElement,
  callingCodeElement: HTMLElement,
  imageUrl: string,
  callingCode: string,
  countryName: string
): void => {
  if (flagElement && callingCodeElement) {
    flagElement.src = imageUrl;
    flagElement.alt = `${countryName} flag`;
    callingCodeElement.textContent = callingCode;
  }
};
