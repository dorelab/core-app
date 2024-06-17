import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { IAPIResponseSesionComplete, UIEventCalendar, calendarOptions } from '../../interfaces';
import { EventImpl } from '@fullcalendar/core/internal';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent {
  @Input() set events(_events: UIEventCalendar[]) {
    if (_events) {
      this.options = {
        ...this.options,
        events: _events as EventSourceInput,
      };
    }
  }

  @Output() onSelectEvent = new EventEmitter<IAPIResponseSesionComplete>();

  public options: CalendarOptions;
  public legendCalendar = [
    { text: 'Sesión Activa', color: '#3788d8' },
    { text: 'Sesión Cerrada', color: '#1D8882' },
    { text: 'Sesión Resumen', color: '#F28A28' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    const self = this;
    this.options = {
      ...calendarOptions,
      eventClick: (e) => self._handleClickEvent(e['event']),
    };

    /*this.breakpointObserver
      .observe('(max-width: 767px)')
      .subscribe(({ matches }) => {
        if (matches) {
          this.options = {
            ...this.options,
            footerToolbar: {
              start: 'prev,next today',
            },
            headerToolbar: {
              left: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
          };
        } else {
          this.options = {
            ...this.options,
            footerToolbar: false,
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
          };
        }
      });*/
  }

  private _handleClickEvent(event: EventImpl) {
    const { extendedProps } = event;
    const { apiData } = extendedProps;
    this.onSelectEvent.emit(apiData);
  }
}
