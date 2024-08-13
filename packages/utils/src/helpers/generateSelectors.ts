import type { AttributeSettings, MuiAttributeKey } from '../types/attribute-types';

export function generateSelectors<Elements extends string, Settings extends AttributeSettings>(
  attribute: MuiAttributeKey,
  elements: readonly Elements[],
  settings: Settings
) {
  /**
   * Type for the return value of getAttribute function
   */
  type GetAttributeReturn<K extends keyof Settings, F extends boolean> = F extends true
    ? Settings[K]['values'][keyof Settings[K]['values']] | undefined
    : string | undefined;

  /**
   * Checks if an element has a specific attribute and optionally returns its value.
   * @param element - The HTML element to check.
   * @param settingKey - The setting key to look for.
   * @param filterInvalid - Optional. If true, must be a valid setting value defined in constants.
   * @returns The attribute value if it exists, or undefined. If filterInvalid is true, returns a valid setting value or undefined.
   */
  const getAttribute = <K extends keyof Settings, F extends boolean = false>(element: Element, settingKey: K, filterInvalid?: F): GetAttributeReturn<K, F> => {
    const attributeName = `mui-${attribute}-${String(settingKey)}`;

    if (!element.hasAttribute(attributeName)) {
      return undefined;
    }

    const attributeValue = element.getAttribute(attributeName);

    if (filterInvalid && attributeValue) {
      const settingValues = settings[settingKey]?.values;
      return (settingValues && attributeValue in settingValues ? settingValues[attributeValue as keyof typeof settingValues] : undefined) as GetAttributeReturn<
        K,
        F
      >;
    }

    return attributeValue as GetAttributeReturn<K, F>;
  };

  /**
   * Finds the closest element with the specified attribute element type, starting from the given element.
   * @param element - The starting element to search from.
   * @param attributeElement - The attribute element type to search for.
   * @returns The closest matching element, or null if not found.
   */
  const getClosestElement = (element: Element, attributeElement: Elements): Element | null => {
    return element.closest(`[mui-${attribute}-element="${attributeElement}"]`);
  };

  /**
   * Generates a selector for elements with the given attribute.
   * @param element - The element type.
   * @returns A string selector for the element.
   */
  const getElementSelector = (element: Elements) => `[mui-${attribute}-element="${element}"]`;

  //   /**
  //    * Gets the index of a specific instance of an element.
  //    * @param element - The element type.
  //    * @param instance - The instance identifier (string or number).
  //    * @returns The index of the element in the elements array.
  //    */
  //   const getInstance = (element: Elements, instance: string | number): number => {
  //     return elements.indexOf(element);
  //   };

  /**
   * Generates the attribute name for a setting.
   * @param setting - The setting key.
   * @returns A string in the format `mui-${attribute}-${setting}`.
   */
  const getSettingAttributeName = (setting: keyof Settings) => `mui-${attribute}-${String(setting)}`;

  /**
   * Creates a selector for elements with a specific setting, optionally with a specific value.
   * @param setting - The setting key.
   * @param value - Optional. The setting value.
   * @returns A string selector for the setting, with or without a specific value.
   */
  const getSettingSelector = <K extends keyof Settings>(setting: K, value?: Settings[K]['values'][keyof Settings[K]['values']]) =>
    value ? `[mui-${attribute}-${String(setting)}="${value}"]` : `[mui-${attribute}-${String(setting)}]`;

  /**
   * Creates a selector for elements that have a specific value for a setting (using = for partial matches).
   * @param setting - The setting key.
   * @param value - The setting value to match.
   * @returns A string selector for elements with the specified setting value.
   */
  const hasAttributeValue = <K extends keyof Settings>(setting: K, value: Settings[K]['values'][keyof Settings[K]['values']]) =>
    `[mui-${attribute}-${String(setting)}="${value}"]`;

  /**
   * Queries all elements of a specific type within a given scope.
   * @param element - The element type to query.
   * @param scope - Optional. The scope to search within. Can be any element or the document. Defaults to document.
   * @returns An array of matching elements.
   */
  const queryAllElements = (element: Elements, scope?: Element | Document): HTMLElement[] =>
    Array.from((scope || document).querySelectorAll<HTMLElement>(`[mui-${attribute}-element="${element}"]`));

  /**
   * Queries the first element of a specific type within a given scope.
   * @param element - The element type to query.
   * @param scope - Optional. The scope to search within. Can be any element or the document. Defaults to document.
   * @returns The first matching element or null if not found.
   */
  const queryElement = (element: Elements, scope?: Element | Document) => (scope || document).querySelector(`[mui-${attribute}-element="${element}"]`);

  return {
    getAttribute,
    getClosestElement,
    getElementSelector,
    // getInstance,
    getSettingAttributeName,
    getSettingSelector,
    hasAttributeValue,
    queryAllElements,
    queryElement,
  };
}
