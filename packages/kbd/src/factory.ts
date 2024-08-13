import { getAttribute } from './utils/selectors';

export const initKbdElement = (kbdElement: HTMLElement) => {
  const trigger = getAttribute(kbdElement, 'trigger');
  if (!trigger) return;

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== trigger.toLowerCase()) return;

    const activeElement = document.activeElement;
    const isEditable =
      activeElement instanceof HTMLElement && (activeElement.isContentEditable || activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

    if (!isEditable) {
      kbdElement.focus();
      event.preventDefault();
    }
  });
};
