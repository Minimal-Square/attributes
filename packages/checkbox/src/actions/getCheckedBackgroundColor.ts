export const getCheckedBackgroundColor = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  let checkedBackgroundColor = '';
  let isColorFound = false;

  const checkColor = (checkbox: HTMLInputElement): Promise<string> => {
    return new Promise((resolve) => {
      if (isColorFound) {
        resolve(checkedBackgroundColor);
        return;
      }

      if (!checkbox.checked) {
        resolve('');
        return;
      }

      const checkboxPreviousSibling = checkbox.previousElementSibling as HTMLElement;

      if (checkboxPreviousSibling) {
        requestAnimationFrame(() => {
          const computedStyle = window.getComputedStyle(checkboxPreviousSibling);
          checkedBackgroundColor = computedStyle.backgroundColor;
          isColorFound = true;
          resolve(checkedBackgroundColor);
        });
      } else {
        resolve('');
      }
    });
  };

  checkboxes.forEach((checkbox) => {
    if (!isColorFound) {
      checkbox.addEventListener('change', () => {
        if (!isColorFound) {
          checkColor(checkbox);
        }
      });
    }
  });

  return {
    color: async () => {
      if (isColorFound) {
        return checkedBackgroundColor;
      }
      // Check all checkboxes until a color is found
      for (const checkbox of checkboxes) {
        const color = await checkColor(checkbox);
        if (color) {
          return color;
        }
      }
      return ''; // Return empty string if no color is found
    },
  };
};
