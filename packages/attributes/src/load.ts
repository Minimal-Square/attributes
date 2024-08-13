import { type MuiAttributeKey } from '@minimalsquare/attributes-utils';

/**
 * Dynamically loads an attribute package.
 * @param attribute
 */
export const loadAttribute = async (attribute: MuiAttributeKey) => {
  switch (attribute) {
    case 'select': {
      return import('@minimalsquare/attributes-select');
    }
    case 'combobox': {
      return import('@minimalsquare/attributes-combobox');
    }
  }
};
