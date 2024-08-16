import { getCheckedBackgroundColor } from './actions';
import { queryElement } from './utils/selectors';

// Extend HTMLInputElement to include our custom properties
interface ExtendedHTMLInputElement extends HTMLInputElement {
  groupCheckboxes?: ExtendedHTMLInputElement[];
  mainCheckbox?: ExtendedHTMLInputElement;
}

export const initCheckboxElement = async (mainCheckboxElement: HTMLElement, groupCheckboxElements: HTMLElement[] = []) => {
  const mainCheckbox = mainCheckboxElement.querySelector<ExtendedHTMLInputElement>('input[type="checkbox"]');
  const fakeCheckbox = mainCheckbox?.previousElementSibling as HTMLDivElement;
  const checkedIcon = queryElement('checked', mainCheckboxElement);
  const indeterminateIcon = queryElement('indeterminate', mainCheckboxElement);

  if (!mainCheckbox || !fakeCheckbox || !checkedIcon || !indeterminateIcon) return;

  const groupCheckboxes = groupCheckboxElements.filter((checkbox): checkbox is ExtendedHTMLInputElement => checkbox instanceof HTMLInputElement);

  // Create a relationship between main checkbox and group checkboxes
  mainCheckbox.groupCheckboxes = groupCheckboxes;
  groupCheckboxes.forEach((checkbox) => {
    checkbox.mainCheckbox = mainCheckbox;
  });

  mainCheckbox.addEventListener('change', () => {
    if (mainCheckbox.checked) {
      mainCheckbox.indeterminate = false;
      mainCheckbox.checked = true;
      fakeCheckbox.classList.add('w--redirected-checked');
      checkedIcon.style.display = 'flex';
      indeterminateIcon.style.display = 'none';
    } else if (mainCheckbox.indeterminate) {
      mainCheckbox.checked = false;
      mainCheckbox.indeterminate = true;
      fakeCheckbox.classList.add('w--redirected-checked');
      checkedIcon.style.display = 'none';
      indeterminateIcon.style.display = 'flex';
    } else {
      mainCheckbox.checked = false;
      mainCheckbox.indeterminate = false;
      fakeCheckbox.classList.remove('w--redirected-checked');
      checkedIcon.style.display = 'none';
      indeterminateIcon.style.display = 'none';
    }

    const isChecked = mainCheckbox.checked;

    // Update group checkboxes
    groupCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      const groupFakeCheckbox = checkbox.previousElementSibling as HTMLDivElement;
      if (isChecked) {
        groupFakeCheckbox.classList.add('w--redirected-checked');
        fakeCheckbox.classList.remove('w--redirected-checked');
        checkedIcon.style.display = 'flex';
        indeterminateIcon.style.display = 'none';
      } else {
        groupFakeCheckbox.classList.remove('w--redirected-checked');
        fakeCheckbox.classList.add('w--redirected-checked');
        checkedIcon.style.display = 'none';
        indeterminateIcon.style.display = 'none';
      }
    });

    // Update main checkbox state based on group checkboxes
    const allChecked = groupCheckboxes.every((checkbox) => checkbox.checked);
    const someChecked = groupCheckboxes.some((checkbox) => checkbox.checked);

    console.log(
      'Group Checkboxes State:',
      groupCheckboxes.map((checkbox) => checkbox.checked)
    );

    console.log('Main Checkbox State:', {
      checked: mainCheckbox.checked,
      indeterminate: mainCheckbox.indeterminate,
    });
  });

  groupCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      // Update main checkbox state based on group checkboxes
      const allChecked = groupCheckboxes.every((checkbox) => checkbox.checked);
      const someChecked = groupCheckboxes.some((checkbox) => checkbox.checked);

      if (allChecked) {
        mainCheckbox.checked = true;
        mainCheckbox.indeterminate = false;
        fakeCheckbox.classList.add('w--redirected-checked');
        checkedIcon.style.display = 'flex';
        indeterminateIcon.style.display = 'none';
      } else if (someChecked) {
        mainCheckbox.checked = false;
        mainCheckbox.indeterminate = true;
        fakeCheckbox.classList.add('w--redirected-checked');
        checkedIcon.style.display = 'none';
        indeterminateIcon.style.display = 'flex';
      } else {
        mainCheckbox.checked = false;
        mainCheckbox.indeterminate = false;
        fakeCheckbox.classList.remove('w--redirected-checked');
        checkedIcon.style.display = 'none';
        indeterminateIcon.style.display = 'none';
      }

      console.log(
        'Group Checkboxes State:',
        groupCheckboxes.map((checkbox) => checkbox.checked)
      );

      console.log('Main Checkbox State:', {
        checked: mainCheckbox.checked,
        indeterminate: mainCheckbox.indeterminate,
      });
    });
  });

  // Initial state update
  const allChecked = groupCheckboxes.every((checkbox) => checkbox.checked);
  const someChecked = groupCheckboxes.some((checkbox) => checkbox.checked);

  if (mainCheckbox.checked) {
    fakeCheckbox.classList.add('w--redirected-checked');

    const isChecked = mainCheckbox.checked;

    groupCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      const groupFakeCheckbox = checkbox.previousElementSibling as HTMLDivElement;
      const groupCheckedIcon = queryElement('checked', checkbox.parentElement as HTMLElement);
      const groupIndeterminateIcon = queryElement('indeterminate', checkbox.parentElement as HTMLElement);

      if (isChecked) {
        groupFakeCheckbox.classList.add('w--redirected-checked');
        if (groupCheckedIcon) groupCheckedIcon.style.display = 'flex';
        if (groupIndeterminateIcon) groupIndeterminateIcon.style.display = 'none';
      } else {
        groupFakeCheckbox.classList.remove('w--redirected-checked');
        if (groupCheckedIcon) groupCheckedIcon.style.display = 'none';
        if (groupIndeterminateIcon) groupIndeterminateIcon.style.display = 'none';
      }
    });
  }
  // initial state logic for group checkboxes
  groupCheckboxes.forEach((checkbox) => {
    const allChecked = groupCheckboxes.every((checkbox) => checkbox.checked);
    const someChecked = groupCheckboxes.some((checkbox) => checkbox.checked);
    const isChecked = checkbox.checked;

    if (allChecked) {
      mainCheckbox.checked = true;
      mainCheckbox.indeterminate = false;
      fakeCheckbox.classList.add('w--redirected-checked');
      checkedIcon.style.display = 'flex';
      indeterminateIcon.style.display = 'none';
    } else if (someChecked) {
      mainCheckbox.indeterminate = true;
      fakeCheckbox.classList.add('w--redirected-checked');
      checkedIcon.style.display = 'none';
      indeterminateIcon.style.display = 'flex';
    } else {
      mainCheckbox.indeterminate = false;
      fakeCheckbox.classList.remove('w--redirected-checked');
      checkedIcon.style.display = 'none';
      indeterminateIcon.style.display = 'none';
    }

    const groupFakeCheckbox = checkbox.previousElementSibling as HTMLDivElement;
    const groupCheckedIcon = queryElement('checked', checkbox.parentElement as HTMLElement);
    const groupIndeterminateIcon = queryElement('indeterminate', checkbox.parentElement as HTMLElement);

    if (isChecked) {
      groupFakeCheckbox.classList.add('w--redirected-checked');
      if (groupCheckedIcon) groupCheckedIcon.style.display = 'flex';
      if (groupIndeterminateIcon) groupIndeterminateIcon.style.display = 'none';
    } else {
      groupFakeCheckbox.classList.remove('w--redirected-checked');
      if (groupCheckedIcon) groupCheckedIcon.style.display = 'flex';
      if (groupIndeterminateIcon) groupIndeterminateIcon.style.display = 'none';
    }
  });

  // Initial console.logs
  console.log(
    'Group Checkboxes State:',
    groupCheckboxes.map((checkbox) => checkbox.checked)
  );

  console.log('Main Checkbox State:', {
    checked: mainCheckbox.checked,
    indeterminate: mainCheckbox.indeterminate,
  });
};
