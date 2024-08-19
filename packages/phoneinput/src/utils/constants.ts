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

  /**
   * This is selected element.
   */
  'selected',
] as const satisfies AttributeElements;
