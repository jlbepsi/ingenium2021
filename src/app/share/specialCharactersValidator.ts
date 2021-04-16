import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const specialCharactersValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  return control.value && control.value.match('^[a-zA-Z0-9][a-zA-Z0-9_.]+$') ?
    null :
    { specialCharactersValidator: true };
};
