import { type AttributeElements, type AttributeSettings } from '@minimalsquare/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'select',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  example: {
    key: 'example',
    values: { value: 'value', value2: 'value2' },
  },
} as const satisfies AttributeSettings;
