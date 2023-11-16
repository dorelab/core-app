import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AdministrationService, DefinitionsModel, ISesionModel, PageResultModel, RequestForm, RequestService, SesionService, UserLoginModel, getLocalStorageUser } from '@app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.page.html',
  styleUrls: ['./crear-solicitud.page.scss'],
})
export class CrearSolicitudPage implements OnInit {
  @Input('sessionID') queryParam!: number;
  private _RequestService: RequestService = inject(RequestService);
  private _AdministrationService: AdministrationService = inject(AdministrationService);
  private _SesionService: SesionService = inject(SesionService);
  private _router:Router = inject(Router);
  public infoUser: UserLoginModel;
  public isLoading: boolean = false;
  public dataSession: ISesionModel = {};
  public previewImage: string | undefined = '';
  public formRequest!: FormGroup<RequestForm>;
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public listaSolicitudes: DefinitionsModel[] = [];
  public fileName: string | null = null;
  public isShowResult: boolean = false;
  public selectedDate: Date | null = null;
  public messageResult: PageResultModel = {
    icon: 'document-text',
    title: 'Datos Guardados',
    subTitle: '¡La solicitud se generó exitosamente!',
    showButton: true,
    buttonLabel: 'Volver',
  };

  constructor() {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  get formControls() {
    return this.formRequest.controls;
  }

  ngOnInit(): void {
    this._getSession(this.queryParam);
    this._getListTypesRequests();
    this._buildForm();
  }

  private _getListTypesRequests(): void {
    this._RequestService.getTypesRequests().subscribe({
      next: (data) => {
        this.listaSolicitudes = data;
      },
    });
  }

  private _buildForm(): void {
    this.formRequest = this._fb.group<RequestForm>(
      {
        sesion: this._fb.control(this.dataSession.id !== undefined ? this.dataSession.id : 0, {validators: [Validators.required]}),
        tipo: this._fb.control(null, { validators: [Validators.required]}),
        descripcion: this._fb.control('', { validators: [Validators.required]}),
        observaciones: this._fb.control('', { validators: [Validators.required]}),
        fecha_solicitud: this._fb.control('', { validators: [Validators.required]}),
        fecha_limite: this._fb.control('', { validators: [Validators.required]}),
        consejero: this._fb.control(this.infoUser.usuario_id, { validators: [Validators.required]}),
        archivo_: this._fb.control('', { validators: [Validators.required]}),
      }
    );
  }

  private _getSession(id: number) {
    this.isLoading = true;
    this._SesionService.getSesionsByID(id).subscribe({
      next: (response: ISesionModel) => {
        this.dataSession = response;

        if(this.dataSession.id)
          this.formControls.sesion.setValue(this.dataSession.id);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  public _saveRequest() {
    const dataResponse = this.formRequest.value;
    /*const { archivo } = this.formRequest.getRawValue();

    const fileAux = archivo.originFileObj
      ? archivo.originFileObj
      : archivo;*/

    this._RequestService.saveRequest(dataResponse).subscribe({
      complete: () => {
        this.isShowResult = true;
      },
    });
  }

  handlePageResultEvent(){
    this.isShowResult = false;
    this._buildForm();
    this.fileName = null;
    this._router.navigate(['/dashboard/solicitud/']);
  }

  handleDate(event: Date){
    const dateTransform = moment(event).format('YYYY-MM-DD');
    this.formControls.fecha_solicitud.patchValue(dateTransform);
  }

  changeFile(event: any) {
    const files = event.target.files;

    if (files.length === 0) {
        return;
    }

    for (const file of files) {
      let reader = new FileReader();
      this.fileName = file.name.split('/').pop().split('\\').pop();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formControls.archivo_.patchValue((reader.result as string));
      };
    }
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    const dateTransform = moment(event.value).format('YYYY-MM-DD');
    this.formControls.fecha_limite.patchValue(dateTransform);
  }

}
