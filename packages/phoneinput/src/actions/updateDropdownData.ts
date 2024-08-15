/**
 * Update the dropdown with the selected country data
 * @param flagElement - The flag element
 * @param callingCodeElement - The calling code element
 * @param flagUrl - The url of the flag of the selected country
 * @param callingCode - The calling code of the selected country
 */
export const updateDropdownData = (flagElement: HTMLImageElement, callingCodeElement: HTMLElement, flagUrl: string, callingCode: string) => {
  flagElement.src = flagUrl;
  callingCodeElement.textContent = callingCode;
};
