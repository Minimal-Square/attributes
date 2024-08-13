import { KBD_ATTRIBUTE, generateSelectors } from '@minimalsquare/attributes-utils';
import { ELEMENTS, SETTINGS } from './constants';

export const {
  getAttribute,
  getClosestElement,
  getElementSelector,
  getSettingAttributeName,
  getSettingSelector,
  hasAttributeValue,
  queryAllElements,
  queryElement,
} = generateSelectors(KBD_ATTRIBUTE, ELEMENTS, SETTINGS);
