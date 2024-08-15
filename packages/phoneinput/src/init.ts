import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initPhoneInputElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const phoneInputElements = queryAllElements('dropdown');

  phoneInputElements.map(initPhoneInputElement);

  return {};
};
