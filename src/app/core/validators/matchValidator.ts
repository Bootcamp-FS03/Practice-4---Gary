import {
  AbstractControl, ValidationErrors,
  ValidatorFn
} from '@angular/forms';


export function matchValidator(passToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const matchingControl = control.root.get(passToMatch);
    if (matchingControl && value !== matchingControl.value)
      return { match: true };
    return null;
  };
}
