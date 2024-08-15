/**
 * Detect user location based on IP address
 * @returns {Promise<string>} Promise that resolves with the user's country code
 * @example
 * const countryCode = await getUserLocation();
 */
export const getUserLocation = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Error detecting user country:', error);
    return 'US';
  }
};
