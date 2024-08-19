export interface BaseValidationSettings {
  errorClass: string;
  successClass?: string;
  showSuccessMessage?: boolean;
  defaultInvalidMessage: string;
  defaultSuccessMessage: string;
}

export interface EmailValidationSettings extends BaseValidationSettings {
  maxLength?: number;
  specificDomains?: string[];
  showMultipleErrorMessages?: boolean;
  defaultMaxLengthMessage?: string;
  defaultSpecificDomainMessage?: string;
}

export interface UrlValidationSettings extends BaseValidationSettings {}

export interface IdenticalToValidationSettings extends BaseValidationSettings {}
