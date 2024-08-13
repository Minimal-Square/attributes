/**
 * Waits for the Webflow page to be fully loaded and initialized.
 * @returns A promise that resolves when Webflow is ready.
 */
export function waitWebflowReady(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete' && window.Webflow) {
      window.Webflow.push(() => {
        resolve();
      });
    } else {
      const handleReady = () => {
        window.Webflow ||= [];
        window.Webflow.push(() => {
          resolve();
        });
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleReady);
      } else {
        handleReady();
      }
    }
  });
}
