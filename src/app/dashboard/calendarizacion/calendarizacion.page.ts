import { Component, OnInit, inject } from '@angular/core';
import { AdministrationService, ControlModalService, EventsModelsFilters, EventsModelsResponse, IAPIFilterSession, IAPIResponseSesionComplete, IApiFilterCommon, IApiFiltersConvocatoria, IApiResponseCommittees, IApiResponseUserID, SchedulingService, TStatusSession, TypeEvents, UIEventCalendar, getLocalStorageUser } from '@app/shared';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { ModalSesionComponent } from './components/modal-sesion/modal-sesion.component';
import { ModalSesionResumenComponent } from './components/modal-sesion-resumen/modal-sesion-resumen.component';
import { ModalVotarComponent } from './components/modal-votar/modal-votar.component';

@Component({
  selector: 'app-calendarizacion',
  templateUrl: './calendarizacion.page.html',
  styleUrls: ['./calendarizacion.page.scss'],
})
export class CalendarizacionPage implements OnInit {
  public optionsTeams: IApiResponseCommittees[] = [];
  public currentFilters: IApiFiltersConvocatoria | null = null;
  public currentEvent: IAPIResponseSesionComplete | null = null;
  public events: UIEventCalendar[] = [];
  private _administrationService: AdministrationService = inject(AdministrationService);
  private _schedulingService: SchedulingService = inject(SchedulingService);
  public formFilters: FormGroup = inject(NonNullableFormBuilder).group({
    nombre: [null],
    equipos__id: [null],
  });
  public userData: IApiResponseUserID | null = null;
  public dataModals: any = {
    'votar': {component: ModalVotarComponent, class: 'modal-votar'},
    'sesion': {component: ModalSesionComponent, class: 'modal-sesion'},
    'sesion-resumen': {component: ModalSesionResumenComponent, class: 'modal-sesion-resumen'},
  };

  constructor(
    private controlModalService: ControlModalService,
  ) {
    this.userData = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {
    this._getEvents(null, [
      {
        tipo_evento: TypeEvents.ANNIVERSARIES,
      },
      {
        tipo_evento: TypeEvents.BIRTHDAY,
      },
    ]);
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

  private _getEvents(filterCalls: IAPIFilterSession | null, filtersSpecialEvents: EventsModelsFilters[]) {
      forkJoin({
        calls: this._getCalls(filterCalls),
        specialEvents: this._getSpecialEvents(filtersSpecialEvents),
      }).subscribe({
        next: ({ calls, specialEvents }) => {
          this.events = [...calls, ...specialEvents];
        },
      });
  }

  private _getSpecialEvents(filters: EventsModelsFilters[]) {
    const filters$ = filters.map((filter) =>
      this._schedulingService.getEvents(filter)
    );

    return forkJoin(filters$).pipe(
      map(([anniversaries, birthdays]) =>
        this._addEvents(anniversaries, birthdays)
      )
    );
  }

  private _getCalls(filter: IAPIFilterSession | null) {
    return this._schedulingService
      .getSesions(filter)
      .pipe(map((data) => this._handleEvents(data)));
  }

  private _getCommittessList(filters: IApiFilterCommon | null) {
    this._administrationService.getCommittees(filters).subscribe({
      next: (response) => {
        this.optionsTeams = response.results;
      },
    });
  }

  private _addEvents(
    anniversaries: EventsModelsResponse[],
    birthdays: EventsModelsResponse[]
  ): UIEventCalendar<EventsModelsResponse>[] {
    const newEvents: UIEventCalendar<EventsModelsResponse>[] = [];

    anniversaries.forEach((item) => {
      newEvents.push({
        id: item.id,
        title: `${item.nombre}`,
        display: 'block',
        start: `${item.efemeride?.fecha}`,
        end: `${item.efemeride?.fecha}`,
        backgroundColor: 'green',
        color: '#FFF',
        borderColor: 'green',
        textColor: '#FFF',
        extendedProps: {
          apiData: item,
        },
      });
    });

    birthdays.forEach((item) => {
      newEvents.push({
        id: item.id,
        title: `🎂 ${item.nombre}`,
        display: 'block',
        start: `${item.cumpleanno?.fecha}`,
        end: `${item.cumpleanno?.fecha}`,
        backgroundColor: 'green',
        color: '#FFF',
        borderColor: 'green',
        textColor: '#FFF',
        extendedProps: {
          apiData: item,
        },
      });
    });

    return newEvents;
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

    this._getEvents(this.currentFilters, [
      {
        tipo_evento: TypeEvents.ANNIVERSARIES,
      },
      {
        tipo_evento: TypeEvents.BIRTHDAY,
      },
    ]);
  }

  handleResetFilters() {
    this.currentFilters = null;
    this.formFilters.reset();
    this._getEvents(this.currentFilters, [
      {
        tipo_evento: TypeEvents.ANNIVERSARIES,
      },
      {
        tipo_evento: TypeEvents.BIRTHDAY,
      },
    ]);
  }

  createModal(event: IAPIResponseSesionComplete, resumen: boolean = false) {
    this.currentEvent = event;

    if (event.estatus === 'ABIERTA') {
      this.openModal(event, 'votar');

    } else if (event.estatus === 'CREADA'){
      this.openModal(event, 'sesion');

    } else if (event.estatus === 'CERRADA'){
      if (resumen) {
        this.openModal(event, 'sesion-resumen');
      } else {
        this.openModal(event, 'sesion');
      }
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
        console.log(data)
        if (data) {
          if (typeof(data.openModalResumen) !== 'undefined' && data.openModalResumen && this.currentEvent) {
            this.createModal(this.currentEvent, true);
          }
        }
      });
  }

}
