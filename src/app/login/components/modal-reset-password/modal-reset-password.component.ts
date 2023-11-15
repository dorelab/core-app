import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { emailPattern } from '@app/shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-reset-password',
  templateUrl: './modal-reset-password.component.html',
  styleUrls: ['./modal-reset-password.component.scss'],
})
export class ModalResetPasswordComponent implements OnInit {
  email: FormControl = this.fb.control(null, [
    Validators.required,
    Validators.pattern(emailPattern),
  ]);

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {}

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  hadlerConfirm() {
    return this.modalCtrl.dismiss(this.email.value, 'confirm');
  }
}
