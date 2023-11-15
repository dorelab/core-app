import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidations, emailPattern } from '@app/shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-new-password',
  templateUrl: './modal-new-password.component.html',
  styleUrls: ['./modal-new-password.component.scss'],
})
export class ModalNewPasswordComponent implements OnInit {
  formResetPassword: FormGroup = this.fb.group(
    {
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    },
    {
      validators: [
        CustomValidations.passwordValidation('password', 'confirmPassword'),
      ],
    } as AbstractControlOptions
  );

  get email() {
    return this.formResetPassword.get('email');
  }

  get password() {
    return this.formResetPassword.get('password');
  }
  get confirmPassword() {
    return this.formResetPassword.get('confirmPassword');
  }

  get validationConfirm() {
    return this.formResetPassword.controls['confirmPassword'].hasError(
      'noMatch'
    );
  }

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {}

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  hadlerConfirm() {
    return this.modalCtrl.dismiss(this.formResetPassword.value, 'confirm');
  }

  validationInput(formControlName: string): boolean {
    return (this.formResetPassword?.get(formControlName)?.invalid &&
      (this.formResetPassword?.get(formControlName)?.touched ||
        this.formResetPassword?.get(formControlName)?.dirty)) as boolean;
  }
}
