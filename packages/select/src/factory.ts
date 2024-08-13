import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';

import { queryAllElements } from './utils/selectors';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const selects = queryAllElements('select');
  console.log(selects);

  return {};
};
