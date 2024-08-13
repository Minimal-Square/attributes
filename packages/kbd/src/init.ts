import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initKbdElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const kbdElements = queryAllElements('input');

  kbdElements.map(initKbdElement);

  return {};
};
