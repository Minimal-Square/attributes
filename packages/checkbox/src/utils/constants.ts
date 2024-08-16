import { type AttributeElements, type AttributeSettings } from '@minimalsquare/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'checkbox',

  /**
   * This is an element example definition.
   */
  'checked',

  /**
   * This is an element example definition.
   */
  'indeterminate',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  disabled: {
    key: 'disabled',
    values: { true: 'true', false: 'false' },
  },

  /**
   * Defines a setting example definition.
   */
  group: {
    key: 'group',
  },
} as const satisfies AttributeSettings;
