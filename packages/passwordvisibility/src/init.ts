import { type MuiAttributeInit, waitWebflowReady } from '@minimalsquare/attributes-utils';
import { queryAllElements } from './utils/selectors';
import { initPasswordVisibilityElement } from './factory';

export const init: MuiAttributeInit = async () => {
  await waitWebflowReady();

  const passwordVisibilityElements = queryAllElements('input');

  passwordVisibilityElements.map(initPasswordVisibilityElement);

  return {};
};
