import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    themeSystem: 'bootstrap5',
    /*views: {
      timeGridMes: {
        type: 'dayGridMonth',
        dayMaxEventRows: 4,
        buttonText: 'Mes',
        titleFormat: { year: 'numeric', month: 'short'}
      },
      timeGridDia: {
        type: 'timeGridDay',
        buttonText: 'Día',
        titleFormat: { month: 'short', day: 'numeric' }
      }
    },*/
    headerToolbar: {
      left: 'prevMonth,nextMonth',
      center: 'prev,next',
      //left: 'timeGridMes',
      //center: 'timeGridDia',
      right: 'title'
    },
    slotMinTime: "07:00:00",
    slotMaxTime: "19:00:00",
    stickyHeaderDates: true,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: esLocale,
    slotLabelFormat: {
      hour: '2-digit',
      hour12: true,
      meridiem: 'short'
    },
    eventTimeFormat:{
      hour: '2-digit',
      hour12: true,
    },
    titleFormat:{
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    },
    events: [
      { title: 'event 1', date: '2023-10-12' },
      { title: 'event 2', date: '2023-10-13' },
    ],
    height: '600px'
  };
}
