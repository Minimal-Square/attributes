import { ATTRIBUTES } from '../constants/attributes';

/**
 * Represents the key of an attribute in the ATTRIBUTES object.
 */
export type MuiAttributeKey = keyof typeof ATTRIBUTES;

/**
 * Defines a readonly array of strings representing attribute elements.
 */
export type AttributeElements = readonly string[];

/**
 * Defines the structure for attribute settings.
 * Each setting has a key and a values object containing key-value pairs.
 */
export type AttributeSettings = {
  [key: string]: {
    key: string;
    values?: Record<string, AttributeSettingValue>;
  };
};

/**
 * Represents the possible types of values for attribute settings.
 */
export type AttributeSettingValue = string | number | boolean;

/**
 * Defines the structure of an individual attribute setting.
 * It includes a key of type MuiAttributeKey and a values object.
 */
export type AttributeSetting = {
  key: MuiAttributeKey;
  values: Record<string, AttributeSettingValue>;
};

/**
 * Represents an initialization function for MUI attributes.
 * Returns a Promise that resolves to an object with optional destroy and result properties.
 */
export type MuiAttributeInit = () => Promise<{
  destroy?: () => void;
  result?: unknown;
}>;

/**
 * Defines a tuple containing an MuiAttributeKey and a callback function.
 * The callback function takes an unknown instance as its parameter.
 */
export type MuiAttributesCallback = [MuiAttributeKey, (instance: unknown) => void];
