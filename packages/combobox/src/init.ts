import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initComboboxElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const comboboxElements = queryAllElements('combobox');

  comboboxElements.map(initComboboxElement);

  return {};
};
