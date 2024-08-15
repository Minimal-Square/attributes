import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initSolutionElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const solutionElement = queryAllElements('example');

  solutionElement.map(initSolutionElement);

  return {};
};
