import { Component, OnInit, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CustomValidations, PageResultModel } from '@app/shared';

@Component({
  selector: 'app-cambiar-contrasenna',
  templateUrl: './cambiar-contrasenna.page.html',
  styleUrls: ['./cambiar-contrasenna.page.scss'],
})

export class CambiarContrasennaPage implements OnInit {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  public isShowResult: boolean = false;
  public messageResult: PageResultModel = {
    icon: 'lock-closed',
    title: 'Contraseña Actualizada',
    subTitle: '¡Su contraseña fue cambiada con éxito!',
    showButton: true,
    buttonLabel: 'Volver',
  };
  formData: FormGroup = this.fb.group(
    {
      old_password: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    },
    {
      validators: [
        CustomValidations.passwordValidation('password', 'confirm_password'),
      ],
    } as AbstractControlOptions
  );

  get validationConfirm() {
    return this.formData.controls['confirm_password'].hasError(
      'noMatch'
    );
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  saveData() {
    let dataForm = this.formData.value;

    this._authService.changePassword(dataForm).subscribe({
      next: (data) => {
        if (data.estado === 'ok') {
          this.isShowResult = true;
        }
      },
    });
  }

  reload() {
    this.formData.reset();
    this.isShowResult = false;
    this._router.navigate(['/dashboard/home/']);
  }
}
