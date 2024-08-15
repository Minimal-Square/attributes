import { type AttributeElements, type AttributeSettings } from '@minimalsquare/attributes-utils';

export const ELEMENTS = [
  /**
   * This is dropdown element.
   */
  'dropdown',

  /**
   * This is flag element.
   */
  'flag',

  /**
   * This is dropdown value element.
   */
  'value',

  /**
   * This is dropdown list element.
   */
  'list',

  /**
   * This is dropdown menu item element.
   */
  'item',
] as const satisfies AttributeElements;
