import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';


export class CustomValidations {
  static passwordValidation(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordValue = formGroup.get(password)?.value;
      const confirmPasswordValue = formGroup.get(confirmPassword)?.value;

      if (passwordValue !== confirmPasswordValue) {
        formGroup.get(confirmPassword)?.setErrors({ noMatch: true });
        return { noMatch: true };
      }

      formGroup.get(confirmPassword)?.setErrors(null);

      return null;
    };
  }

  static emailsValidation(
    email: string,
    confirmEmail: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const emailValue = formGroup.get(email)?.value;
      const confirmEmailValue = formGroup.get(confirmEmail)?.value;

      if (emailValue !== confirmEmailValue) {
        formGroup.get(confirmEmail)?.setErrors({ noMatchEmail: true });
        return { noMatchEmail: true };
      }

      formGroup.get(confirmEmail)?.setErrors(null);

      return null;
    };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  static minLengthArrayValidation(
    minLength: number,
    array: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const arrayValue = formGroup.get(array)?.value;

      if (arrayValue.length < minLength) {
        formGroup.get(array)?.setErrors({ minLength: true });
        return { minLength: true };
      }

      formGroup.get(array)?.setErrors(null);

      return null;
    };
  }

}

export const minLengthArray = (min: number) => {
  return (c: AbstractControl): {[key: string]: any} => {
    if (c.value.length >= min) {
      return { MinLengthArray: false};
    }
    return { MinLengthArray: true};
  }
}
