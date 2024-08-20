export type EmailValidation = (params: {
  inputElement: EmailValidationElements['inputElement'];
  maxLength: EmailValidationSettings['maxLength'];
  specificDomains: EmailValidationSettings['specificDomains'];
  maxLengthError: EmailValidationMessages['maxLengthError'];
  invalidError: EmailValidationMessages['invalidError'];
  specificDomainError: EmailValidationMessages['specificDomainError'];
}) => string[];

export interface GeneralValidationSettings {
  errorClass: string | undefined;
  successClass: string | undefined;
  showSuccessMessage?: boolean;
}

export interface EmailValidationElements {
  inputElement: HTMLInputElement | HTMLTextAreaElement;
  messageElement: HTMLElement;
}

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
