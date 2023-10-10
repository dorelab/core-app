import { FormControl } from '@angular/forms';

export const numbersPattern: string = '^[0-9,$]*$';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
export const passwordPattern: RegExp =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const namesPattern: RegExp =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/;
export const EasyRegexPattern: RegExp =
  /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/;
export const mediumRegexPattern: RegExp =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
export const strongRegexPattern: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const hasNumberRegexPattern: RegExp = /\d/;
export const hasCapitalCaseRegexPattern: RegExp = /[A-Z]/;
export const hasSmallCaseRegexPattern: RegExp = /[a-z]/;
export const hasSpecialSymbolsRegexPattern: RegExp = /^(?=.*[!@#$%^&*])/;
export const minLengthRegexPattern: RegExp = /(?=.{9,})/;
export const nitRegexPattern: RegExp = /^[0-9]+(-[0-9kK])$/;

export const rutRegexPattern:RegExp = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;

export function validationInput(formControl: FormControl): boolean {
  return formControl?.invalid && (formControl?.touched || formControl?.dirty);
}
