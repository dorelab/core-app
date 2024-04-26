import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdministrationService, AuthService, CustomValidations, emailPattern, FALLBACK, getLocalStorageUser, IApiFilterParties, IApiResponseBenches, IApiResponseCircunscripciones, IApiResponseParties, IApiResponseTypeProfile, IApiResponseUserID, IUserHomeForm, numbersPattern, PageResultModel, rutRegexPattern } from '@app/shared';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
})
export class MisDatosPage implements OnInit {
  infoUser: any;
  public idUserLogin: number = 0;
  public userLogin: IApiResponseUserID | null = null;
  public formUser!: FormGroup<IUserHomeForm>;
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private _administrationService: AdministrationService = inject(AdministrationService);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  public previewImage: string | undefined = '';
  public bancadasList: IApiResponseBenches[] = [];
  public partidosList: IApiResponseParties[] = [];
  public circunscripcionList: IApiResponseCircunscripciones[] = [];
  public typeProfilesList: IApiResponseTypeProfile[] = [];
  public fallback = FALLBACK;
  public fileName: string | null = null;
  public imgURL: any | null = null;
  public isShowResult: boolean = false;
  public messageResult: PageResultModel = {
    icon: 'person',
    title: 'Usuario/a Actualizado',
    subTitle: '¡El usuario/a se actualizó con éxito!',
    showButton: true,
    buttonLabel: 'Volver',
  };

  constructor() {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  get formControls() {
    return this.formUser.controls;
  }

  ngOnInit(): void {
    this._getUserData(this.infoUser.usuario_id);
    this._buildForm();

    this.formControls.bancada.valueChanges.subscribe((benchesId) => {
      this.formControls.partido.reset(null);
      this._getPartiesList({
        bancada__id: benchesId?.toString(),
      });
    });
  }

  _initialFuctions() {
    forkJoin([
      this._authService.getProfiles(),
      this._administrationService.getBenchesList(),
      this._administrationService.getCircunscripcionList(),
    ]).subscribe({
      next: ([profiles, benches, circunscripciones]) => {
        this.typeProfilesList = profiles;
        this.bancadasList = benches;
        this.circunscripcionList = circunscripciones;

        if (this.userLogin) {
          const profileID = this.typeProfilesList.find(
            (i) => i.nombre == this.userLogin?.perfil
          )?.id;

          this.formControls.perfil.patchValue(profileID ?? null);
        }
      },
    });
  }

  private _getUserData(userID: number) {
      this._authService.getUserByID(userID).subscribe({
        next: (user) => {
          this.userLogin = user;
          this.changeDataUser();
          this._initialFuctions();
        }
      });
  }

  changeDataUser(): void {
    if (this.userLogin) {
      this.formUser.patchValue({
        ...this.userLogin,
        bancada: this.userLogin.bancada.id,
        partido: this.userLogin.partido.id,
        circunscripcion: this.userLogin.circunscripcion.id,
        perfil: null,
      });

      this.formControls.partido.patchValue(this.userLogin.partido.id);
      this.uploadPhoto(this.userLogin.imagen);
      this.formUser.removeValidators(
        CustomValidations.passwordValidation('password', 'confirm_password')
      );
      this.formUser.clearValidators();
    }
  }

  private _buildForm(): void {
    this.formUser = this._fb.group<IUserHomeForm>(
      {
        nombre: this._fb.control('', {
          validators: [Validators.required],
        }),
        email: this._fb.control('', {
          validators: [Validators.required, Validators.pattern(emailPattern)],
        }),
        rut: this._fb.control('', { validators: [
          CustomValidations.patternValidator(rutRegexPattern, {
            isRutInValid: true,
          }),
        ]}),
        telefono: this._fb.control(null, {
          validators: [Validators.pattern(numbersPattern)],
        }),
        circunscripcion: this._fb.control(null, {
          validators: [Validators.required],
        }),
        bancada: this._fb.control(null, { validators: [Validators.required] }),
        partido: this._fb.control(null, { validators: [Validators.required] }),
        perfil: this._fb.control(null, { validators: [Validators.required] }),
        imagen: this._fb.control(null),
        estado: this._fb.control(true),
        is_active: this._fb.control(true),
      }
    );

    this.changeDataUser();
  }

  private _getPartiesList(filter: IApiFilterParties | null): void {
    if (!filter?.bancada__id) {
      this.partidosList = [];
      return;
    }
    this._administrationService
      .getPartiesList(filter)
      .subscribe((parties) => (this.partidosList = parties));
  }

  onEditUser() {
    const dataEdit = this.formUser.value;
    const { imagen, ...additionalInfo } = dataEdit;

    this._authService.updateUsers(
      {
        file: typeof dataEdit.imagen === 'string' ? null : dataEdit.imagen,
        name: 'imagen',
        additionalParams: additionalInfo,
      },
      Number(this.userLogin?.id)
    ).subscribe({
      complete: () => {
        this.isShowResult = true;
      },
    });
  }

  changeFile(event: any) {
    const files = event.target.files;

    if (files.length === 0) {
        return;
    }

    for (const file of files) {
      console.log(file);
      let reader = new FileReader();
      this.fileName = file.name.split('/').pop().split('\\').pop();
      this.formControls.imagen.patchValue(file as File);

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  uploadPhoto(image: any) {
    this.formControls.imagen.setValue(image);
    this.imgURL = !image ? 'https://ionicframework.com/docs/img/demos/avatar.svg' : image;
  }

  reload() {
    this.isShowResult = false;
    this._router.navigate(['/dashboard/home/']);
  }
}
