import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initCheckboxElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const checkboxElements = queryAllElements('checkbox');

  checkboxElements.map(initCheckboxElement);

  return {};
};
