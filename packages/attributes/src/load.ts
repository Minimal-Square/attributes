import { type MuiAttributeKey } from '@minimalsquare/attributes-utils';

/**
 * Dynamically loads an attribute package.
 * @param attribute
 */
export const loadAttribute = async (attribute: MuiAttributeKey) => {
  switch (attribute) {
    case 'kbd': {
      return import('@minimalsquare/attributes-kbd');
    }
  }
};
