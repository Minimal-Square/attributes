import { KBD_ATTRIBUTE, generateSelectors } from '@minimalsquare/attributes-utils';
import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, queryAllElements } = generateSelectors(KBD_ATTRIBUTE, ELEMENTS, SETTINGS);
