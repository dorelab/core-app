import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-votar',
  templateUrl: './modal-votar.component.html',
  styleUrls: ['./modal-votar.component.scss'],
})
export class ModalVotarComponent implements OnInit, OnChanges {

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {

  }

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  saveData() {
    const submitData = {
      body: {},
    };

    return this.modalCtrl.dismiss(submitData, 'confirm');
  }
}
