import { SELECT_ATTRIBUTE, generateSelectors } from '@minimalsquare/attributes-utils';
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
} = generateSelectors(SELECT_ATTRIBUTE, ELEMENTS, SETTINGS);
