import type { BaseValidationElements } from './base';

export type EmailValidation = (params: {
  inputElement: BaseValidationElements['inputElement'];
  maxLength: EmailValidationSettings['maxLength'];
  specificDomains: EmailValidationSettings['specificDomains'];
  maxLengthError: EmailValidationMessages['maxLengthError'];
  invalidError: EmailValidationMessages['invalidError'];
  specificDomainError: EmailValidationMessages['specificDomainError'];
}) => string[];

export interface EmailValidationSettings {
  maxLength: number;
  specificDomains: string[];
  showMultipleErrors: boolean;
}

export interface EmailValidationMessages {
  invalidError: string;
  maxLengthError?: string;
  specificDomainError?: string;
  successMessage: string;
}
