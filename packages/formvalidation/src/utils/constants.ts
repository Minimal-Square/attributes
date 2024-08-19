import { type AttributeElements, type AttributeSettings } from '@minimalsquare/attributes-utils';

export const ELEMENTS = [
  /**
   * This is an element example definition.
   */
  'input',

  /**
   * This is an element example definition.
   */
  'helper',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines a setting example definition.
   */
  trigger: {
    key: 'trigger',
    values: { submit: 'submit', blur: 'blur', input: 'input' },
  },

  /**
   * Defines a setting example definition.
   */
  type: {
    key: 'type',
    values: { phone: 'phone', email: 'email', password: 'password', creditCard: 'creditCard', url: 'url', regex: 'regex', identical: 'identical' },
  },

  /**
   * Defines a setting example definition.
   */
  maxlength: {
    key: 'maxlength',
  },

  /**
   * Defines a setting example definition.
   */
  specificdomains: {
    key: 'specificdomains',
  },

  /**
   * Defines a setting example definition.
   */
  errorclass: {
    key: 'errorclass',
  },

  /**
   * Defines a setting example definition.
   */
  successclass: {
    key: 'successclass',
  },

  /**
   * Defines a setting example definition.
   */
  showmultipleerrors: {
    key: 'showmultipleerrors',
    values: { true: 'true', false: 'false' },
  },

  /**
   * Defines a setting example definition.
   */
  showsuccessmessage: {
    key: 'showsuccessmessage',
    values: { true: 'true', false: 'false' },
  },

  /**
   * Defines a setting example definition.
   */
  invaliderror: {
    key: 'invaliderror',
  },

  /**
   * Defines a setting example definition.
   */
  maxlengtherror: {
    key: 'maxlengtherror',
  },

  /**
   * Defines a setting example definition.
   */
  specificdomainerror: {
    key: 'specificdomainerror',
  },

  /**
   * Defines a setting example definition.
   */
  successmessage: {
    key: 'successmessage',
  },
} as const satisfies AttributeSettings;
