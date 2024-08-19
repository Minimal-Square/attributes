import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initInputElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const inputElements = queryAllElements('input');

  inputElements.map((inputElement) => {
    if (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLTextAreaElement) {
      initInputElement(inputElement);
    }
  });
  return {};
};
