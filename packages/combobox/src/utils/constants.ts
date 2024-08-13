import { type AttributeElements, type AttributeSettings } from '@minimalsquare/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'combobox',

  /**
   * This is an element example definition.
   */
  'wrapper',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  locale: {
    key: 'locale',
  },

  /**
   * Defines a setting example definition.
   */
  year: {
    key: 'year',
    values: { numeric: 'numeric', '2-digit': '2-digit' },
  },
} as const satisfies AttributeSettings;
