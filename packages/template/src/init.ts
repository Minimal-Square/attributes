import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';

import { getAttribute } from './utils/selectors';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  console.log('Test');

  return {};
};
