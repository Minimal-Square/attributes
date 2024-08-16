import { getCheckedBackgroundColor, getGroupCheckboxes, getMainCheckboxes } from './actions';
import { getSettingAttributeName, queryElement } from './utils/selectors';

let checkedBackgroundColor: string = '';
let mainCheckboxes: HTMLInputElement[] = [];
let groupCheckboxes: HTMLInputElement[] = [];

export const initCheckboxElement = async (checkboxElement: HTMLElement) => {
  const checkbox = checkboxElement.querySelector<HTMLInputElement>('input[type="checkbox"]');
  const checkedIcon = queryElement('checked', checkboxElement);
  const indeterminateIcon = queryElement('indeterminate', checkboxElement);
  const form = checkboxElement.closest('form');

  const checkboxName = checkbox?.getAttribute('name');

  // Check if the checkbox is started with checked state
  if (!checkbox) return;
  if (!checkedIcon || !indeterminateIcon) return;

  await getCheckedBackgroundColor()
    .color()
    .then((color) => (checkedBackgroundColor = color));

  // Get the main checkbox
  if (!checkboxName || !form) return;
  const mainCheckbox = getMainCheckboxes(checkboxName, form);

  // Get the mai of the checkbox
  const groupCheckboxes = getGroupCheckboxes(checkboxName, form);

  // console.log('Group checkboxes:', groupCheckboxes);
  // console.log('Main checkboxes:', mainCheckbox);

  // mainCheckbox?.addEventListener('change', () => {
  //   console.log('Main checkbox changed:', mainCheckbox);
  // });
};
// // If any of the checkbox in the group is checked, show the indeterminate icon
// checkboxGroupWrapper?.addEventListener('change', async () => {
//   console.log('Group change:', checkboxGroupWrapper);
//   const groupCheckboxes = checkboxGroupWrapper.querySelectorAll('input[type="checkbox"]');
//   const allChecked = Array.from(groupCheckboxes).every((cb) => (cb as HTMLInputElement).checked);
//   const allUnchecked = Array.from(groupCheckboxes).every((cb) => !(cb as HTMLInputElement).checked);

//   const groupSelector = getSettingAttributeName('group');
//   const mainCheckbox = checkboxGroupWrapper.querySelector(`[${groupSelector}="${checkboxName}"] input[type="checkbox"]`) as HTMLInputElement;

//   if (mainCheckbox) {
//     if (!checkedBackgroundColor) {
//       await getCheckedBackgroundColor()
//         .color()
//         .then((color) => (checkedBackgroundColor = color));
//     }

//     if (!allChecked && !allUnchecked) {
//       mainCheckbox.indeterminate = true;
//       checkedIcon.style.display = 'none';
//       indeterminateIcon.style.display = 'flex';
//       if (indeterminateIcon.parentElement && checkedBackgroundColor) {
//         indeterminateIcon.parentElement.style.backgroundColor = checkedBackgroundColor;
//       }
//     } else {
//       mainCheckbox.indeterminate = false;
//       if (allChecked) {
//         mainCheckbox.checked = true;
//         checkedIcon.style.display = 'flex';
//         indeterminateIcon.style.display = 'none';
//         if (checkedIcon.parentElement && checkedBackgroundColor) {
//           checkedIcon.parentElement.style.backgroundColor = checkedBackgroundColor;
//         }
//       } else {
//         mainCheckbox.checked = false;
//         checkedIcon.style.display = 'none';
//         indeterminateIcon.style.display = 'none';
//         if (indeterminateIcon.parentElement) {
//           indeterminateIcon.parentElement.style.backgroundColor = 'transparent';
//         }
//       }
//     }
//   }
// });
