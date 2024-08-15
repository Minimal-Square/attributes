import { PHONEINPUT_ATTRIBUTE, generateSelectors } from '@minimalsquare/attributes-utils';
import { ELEMENTS } from './constants';

export const { getClosestElement, getElementSelector, queryAllElements, queryElement } = generateSelectors(PHONEINPUT_ATTRIBUTE, ELEMENTS);
