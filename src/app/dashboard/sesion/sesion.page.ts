import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Sesion } from '@app/shared';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {
  formData: FormGroup;
  dataSesion: Sesion = new Sesion();
  selectedDate: Date | null = null;

  constructor(
    private fb: FormBuilder
  ) {
    this.formData = Sesion.formControl(this.dataSesion);
  }

  ngOnInit() {
  }

}
