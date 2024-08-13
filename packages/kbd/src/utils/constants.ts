import { type AttributeElements, type AttributeSettings } from '@minimalsquare/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'input',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  trigger: {
    key: 'trigger',
  },
} as const satisfies AttributeSettings;
