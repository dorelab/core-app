import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { AlertFiltersForm, getLocalStorageUser, AlertTypeModel, ALERTS_TYPES, AlertModel, AlertListService, AlertsService } from '@app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {
  infoUser: any;
  public idUserLogin: number = 0;
  public loading: boolean = false;
  public alertTypes: AlertTypeModel[] = ALERTS_TYPES;
  public alertsList: AlertModel[] = [];
  public formAlert!: FormGroup<AlertFiltersForm>;
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private _alertListService: AlertListService = inject(AlertListService);
  private _alertsService: AlertsService = inject(AlertsService);

  constructor() {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {
    this._buildForm();
    this._getAlertsList();
  }

  private _buildForm(): void {
    this.formAlert = this._fb.group<AlertFiltersForm>(
      {
        usuario__id: this._fb.control(this.infoUser.usuario_id, {
          validators: [Validators.required],
        }),
        search: this._fb.control('', {
          validators: [],
        }),
        tipo: this._fb.control('', {
          validators: [],
        })
      }
    );
  }

  _getAlertsList() {
    const dataFilter = this.formAlert.value;

    this._alertListService.getAlertsList(dataFilter).subscribe({
      next:(alerts)=>{
        alerts.map((alert: AlertModel) => {
          alert.fecha_format = moment(alert.fecha).format('DD/MM/YYYY hh:mm:ss a');
          alert.link = this.getLinkAlert(alert.tipo);
        });

        this.alertsList = alerts;
      }
    })
  }

  getLinkAlert(tipo: string) {
    if (tipo === 'NUEVA SESIÓN AGENDADA' || tipo === 'NUEVA INFORMACIÓN DE PROYECTO') {
      return '/dashboard/calendarizacion/';
    }

    return null;
  }

  onRemoveAlert(row: AlertModel) {
    if (!row.id) return;

    this._alertListService
      .deleteAlerts(row.id)
      .subscribe({
        complete: () => {
          this._alertsService.openSnackBar('¡Alerta Eliminada!', 'success');
          this._getAlertsList();
        },
      });
  }

  changeType(type: string | number) {
    this.formAlert.controls['tipo'].setValue(type);
    this._getAlertsList();
  }

  handleFilter(value: string) {
    this.formAlert.controls['search'].setValue(value);
    this._getAlertsList();
  }
}
