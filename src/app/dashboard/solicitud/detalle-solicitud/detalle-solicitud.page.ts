import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentModel, IRequestModel, PageResultModel, RequestService, ResponseRequestForm, ResponseRequestModel, UserLoginModel, fileName, getLocalStorageUser } from '@app/shared';
import { ENVIRONMENT } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.page.html',
  styleUrls: ['./detalle-solicitud.page.scss'],
})
export class DetalleSolicitudPage implements OnInit {
  @Input('requestID') queryParam!: string;
  private _RequestService: RequestService = inject(RequestService);
  //private _authService: AuthService = inject(AuthService);
  infoUser: UserLoginModel;
  public dataRequest: IRequestModel = {};
  public dataResponseRequest: ResponseRequestModel = {};
  public previewImage: string | undefined = '';
  public formResponseRequest!: FormGroup<ResponseRequestForm>;
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private _router: Router = inject(Router);
  private _env: EnvironmentModel = inject(ENVIRONMENT);

  get formControls() {
    return this.formResponseRequest.controls;
  }

  constructor() {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {
    this._buildForm();
    this._getRequest(this.queryParam);
  }

  private _buildForm(): void {
    this.formResponseRequest = this._fb.group<ResponseRequestForm>(
      {
        solicitud: this._fb.control(this.dataRequest.id ? this.dataRequest.id : 0, {validators: []}),
        respuesta: this._fb.control('', { validators: [Validators.required]}),
        archivo: this._fb.control('', { validators: [Validators.required]})
      }
    );
  }

  private _getRequest(id: number | string) {
    this._RequestService.getRequestByID(id).subscribe({
      next: (response) => {
        this.dataRequest = response;
        this.dataRequest.archivo_nombre = this.dataRequest.archivo ? fileName(this.dataRequest.archivo) : '';

        if(this.dataRequest.terminada === true) {
          this._getResponseRequest(id);
          this.formControls.respuesta.disabled;
        }
      }
    });
  }

  private _getResponseRequest(id: number | string) {
    this._RequestService.getResponseRequestByID(id).subscribe({
      next: (response: ResponseRequestModel) => {
        this.dataResponseRequest = response;
        this.dataResponseRequest.archivo_nombre = this.dataResponseRequest.archivo ? fileName(this.dataResponseRequest.archivo) : '';
      },
    });
  }

  openFile(response: boolean = false) {
    const urlRequest = `${this._env.urlFiles}media/${(response ? this.dataResponseRequest.archivo : this.dataRequest.archivo)}`;
    window.open(urlRequest);
  }
}
