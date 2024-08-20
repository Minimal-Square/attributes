export interface BaseValidationElements {
  inputElement: HTMLInputElement | HTMLTextAreaElement;
  messageElement: HTMLElement | null;
}

export interface BaseValidationSettings {
  validationTrigger: 'submit' | 'blur' | 'input' | undefined;
  inputValidationType: 'phone' | 'email' | 'password' | 'creditCard' | 'url' | 'regex' | 'identical' | undefined;
  errorClass: string | undefined;
  successClass: string | undefined;
  showSuccessMessage?: boolean;
}

export type UpdateStyles = (params: {
  isValid: boolean;
  inputElement: BaseValidationElements['inputElement'];
  messageElement: BaseValidationElements['messageElement'];
  errorClass?: BaseValidationSettings['errorClass'];
  successClass?: BaseValidationSettings['successClass'];
  showSuccessMessage?: BaseValidationSettings['showSuccessMessage'];
}) => void;

export type UpdateMessage = (params: {
  isValid: boolean;
  errorMessages: string[];
  successMessage: string;
  messageElement: BaseValidationElements['messageElement'];
  initialMessage: string;
  showSuccessMessage?: BaseValidationSettings['showSuccessMessage'];
  showMultipleErrorMessages?: boolean;
}) => void;
