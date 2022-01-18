import { AbstractControl } from "@angular/forms";

export const validateEnterOnlySpaces = (ac: AbstractControl) => {
  if (ac.value === null) {
    return;
  }

  const result = ac.value.match(/^\s+$/);
  if (result) {
    return { enterOnlySpaces: true };
  }
};
