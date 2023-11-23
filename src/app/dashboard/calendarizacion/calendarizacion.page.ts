import { Component, OnInit, inject } from '@angular/core';
import { AdministrationService, ControlModalService, IAPIFilterSession, IAPIResponseSesionComplete, IApiFilterCommon, IApiFiltersConvocatoria, IApiResponseCommittees, IApiResponseUserID, TStatusSession, UIEventCalendar, getLocalStorageUser } from '@app/shared';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import { ModalSesionComponent } from './components/modal-sesion/modal-sesion.component';
import { ModalSesionActivaComponent } from './components/modal-sesion-activa/modal-sesion-activa.component';
import { ModalVotarComponent } from './components/modal-votar/modal-votar.component';

@Component({
  selector: 'app-calendarizacion',
  templateUrl: './calendarizacion.page.html',
  styleUrls: ['./calendarizacion.page.scss'],
})
export class CalendarizacionPage implements OnInit {
  public optionsTeams: IApiResponseCommittees[] = [];
  public currentFilters: IApiFiltersConvocatoria | null = null;
  public events: UIEventCalendar[] = [];
  private _administrationService: AdministrationService = inject(AdministrationService);
  public formFilters: FormGroup = inject(NonNullableFormBuilder).group({
    iniciativas__nombre__contains: [null],
    equipos__id: [null],
  });
  public userData: IApiResponseUserID | null = null;
  public dataModals: any = {
    'votar': {component: ModalVotarComponent, class: 'modal-votar'},
    'sesion': {component: ModalSesionComponent, class: 'modal-sesion'},
    'sesion-activa': {component: ModalSesionActivaComponent, class: 'modal-sesion-activa'},
  };

  constructor(
    private controlModalService: ControlModalService,
  ) {
    this.userData = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {
    this._getEvents(null);
    this._getCommittessList(null);
  }

  private _handleEvents(data: IAPIResponseSesionComplete[]): UIEventCalendar[] {
    return data.map((sesion) => {
      const { backgroundColor, color } = this._setColors(sesion.estatus);

      return {
        id: sesion.id,
        title: `${sesion.invitacion}`,
        display: 'list-item',
        start: `${sesion.fecha}T${sesion.hora_inicio}`,
        end: `${sesion.fecha}T${sesion.hora_fin}`,
        backgroundColor,
        color,
        borderColor: backgroundColor,
        textColor: color,
        extendedProps: {
          apiData: sesion,
        },
      };
    });
  }

  private _setColors(status: TStatusSession): {
    backgroundColor: string;
    color: string;
  } {
    switch (status) {
      case 'ABIERTA':
        return {
          backgroundColor: '#3788d8',
          color: '#FFF',
        };

      case 'CERRADA':
        return {
          backgroundColor: '#1D8882',
          color: '#FFF',
        };

      default:
        return {
          backgroundColor: '#F28A28',
          color: '#FFF',
        };
    }
  }

  private _getEvents(filter: IAPIFilterSession | null) {
    this._administrationService
      .getSesions(filter)
      .pipe(map((data) => this._handleEvents(data)))
      .subscribe({
        next: (response) => {
          this.events = [...response];
        },
      });
  }

  private _getCommittessList(filters: IApiFilterCommon | null) {
    this._administrationService.getCommittees(filters).subscribe({
      next: (response) => {
        this.optionsTeams = response.results;
      },
    });
  }

  handleFilters() {
    this.currentFilters = null;

    for (const key in this.formFilters.getRawValue()) {
      if (this.formFilters.get(key)?.value) {
        this.currentFilters = {
          ...(this.currentFilters as unknown as IAPIFilterSession),
          [key]: this.formFilters.get(key)?.value,
        };
      }
    }

    this._getEvents(this.currentFilters);
  }

  handleResetFilters() {
    this.currentFilters = null;
    this.formFilters.reset();
    this._getEvents(this.currentFilters);
  }

  createModal(event: IAPIResponseSesionComplete) {
    if (event.estatus === 'ABIERTA') {
      this.openModal(event, 'votar');

    } else if (event.estatus === 'CREADA'){
      this.openModal(event, 'sesion');

    } else if (event.estatus === 'CERRADA'){
      this.openModal(event, 'sesion-activa');

    }
  }

  openModal(data: IAPIResponseSesionComplete, tipo: string) {
    this.controlModalService
      .create({
        component: this.dataModals[tipo].component,
        cssClass: 'custom_modal ' + this.dataModals[tipo].class,
        componentProps: {
          sessionID: data.id,
          userLogin: this.userData
        },
      })
      .subscribe(({ data }) => {
        if (data) {
          console.log(data);
        }
      });
  }

}
