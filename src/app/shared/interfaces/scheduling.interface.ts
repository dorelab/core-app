import { IAPIDocs, IApiResponseEquipos } from "./administration.interface";
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

export const calendarOptions: CalendarOptions = {
  /*headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },*/
  initialView: 'timeGridDay',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    //themeSystem: 'bootstrap5',
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
      left: '',
      center: 'prev,next',
      //left: 'timeGridMes',
      //center: 'timeGridDia',
      right: 'title'
    },
    slotMinTime: "06:00:00",
    slotMaxTime: "24:00:00",
    stickyHeaderDates: true,
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    locale: esLocale,
    slotLabelFormat: {
      hour: '2-digit',
      hour12: true,
      meridiem: 'short'
      //meridiem: 'narrow',
    },
    eventTimeFormat:{
      hour: '2-digit',
      hour12: true,
      /*
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: true,
      */
    },
    titleFormat:{
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    },
    events: [],
    height: '600px'
};

export interface IAPIResponseSesion {
  readonly id: number;
  readonly fecha: string;
  readonly hora_inicio: string;
  readonly hora_fin: string;
  readonly tipo: string;
  readonly subtipo: number;
  readonly invitacion: string;
  readonly estatus: TStatusSession;
  readonly convocados: IAPISesionAsistente[];
  readonly iniciativas: {
    readonly id: number;
    readonly nombre: string;
    readonly informacion: string;
    readonly documentos: IAPIDocs[];
  }[];
  readonly convocatoria: {
    readonly id_convocatoria: number;
    readonly invitacion: string;
    readonly link_zoom: string;
    readonly fecha: string;
  } | null;
  readonly equipos: IApiResponseEquipos[];
  tipo_evento?:TypeEvents;
}

export enum TypeEvents {
  'ANNIVERSARIES' = '2',
  'BIRTHDAY' = '3',
}

export interface ISesionModel {
  readonly id?: number;
  readonly fecha?: string;
  readonly hora_inicio?: string;
  readonly hora_fin?: string;
  readonly tipo?: string;
  readonly subtipo?: number;
  readonly invitacion?: string;
  readonly asistentes?: IAPISesionAsistente[];
  readonly convocados?: IAPISesionAsistente[];
}

export interface IAPISesionAsistente {
  readonly id: number;
  readonly nombre: string;
  readonly partido: string;
  readonly bancada: string;
}

export interface IAPIIniciativa {
  readonly id: number;
  readonly nombre: string;
  readonly informacion: string;
  readonly voto_habilitado: boolean;
  readonly documentos: {
    readonly id: number;
    readonly documento: string;
  }[];
  readonly votos: any[];
  readonly votos_informacion: IAPIInfoVote;
}

export interface IAPIInfoVote {
  readonly apruebo: number;
  readonly rechazo: number;
  readonly me_abstengo: number;
  readonly me_inhabilito: number;
  readonly total: number;
}

/** API summary session */
export interface IAPISummarySession {
  readonly asistentes: IAPIAttendance[];
  readonly datos_asistencia: IAPIDataAttendance;
  readonly datos_votaciones: IAPIDataVote[];
}

export interface IAPIAttendance {
  readonly id: number;
  readonly nombre: string;
  readonly asistencia: boolean; //TODO:
}

export interface IAPIDataAttendance {
  readonly total_presentes: number;
  readonly total_ausentes: number;
  readonly total_asistencia: number;
  readonly total_convocados: number;
}

export interface IAPIRequestVote {
  readonly opcion: number;
  readonly iniciativa: number;
  readonly consejero: number;
}

export interface IAPIResponseVote extends IAPIRequestVote{
  readonly id:number;
}

export interface IAPIResponseSesionComplete {
  readonly id: number;
  readonly fecha: string;
  readonly hora_inicio: string;
  readonly hora_fin: string;
  readonly tipo: TSessionType;
  readonly subtipo: number;
  readonly invitacion: string;
  readonly estatus: TStatusSession;
  readonly convocados: IAPISesionAsistente[];
  readonly iniciativas: {
    readonly id: number;
    readonly nombre: string;
    readonly informacion: string;
    readonly documentos: IAPIDocs[];
  }[];
  readonly convocatoria: {
    readonly id_convocatoria: number;
    readonly invitacion: string;
    readonly link_zoom: string;
    readonly fecha: string;
  } | null;
}

export type TSessionType = 'EXTRAORDINARIA' | 'ORDINARIA' | 'PRIVADA';

export type TStatusSession = 'CREADA' | 'ABIERTA' | 'CERRADA';

export interface UIEventCalendar<T=any> {
  id: number;
  title: string;
  display: string;
  start: string;
  end: string;
  backgroundColor: string;
  color: string;
  borderColor: string;
  textColor: string;
  classNames?: string[];
  extendedProps: UIExtendedProps<T>;
}

export interface IAPISesionAsistente {
  readonly id: number;
  readonly nombre: string;
  readonly partido: string;
  readonly bancada: string;
}

export interface UIExtendedProps<T> {
  apiData: T;
}

export interface IVotesIniciative extends IAPIDataVote {
  display_apruebo: number;
  display_rechazo: number;
  display_me_abstengo: number;
  display_me_inhabilito: number;
  display_total_votos: number;
}

export interface IAPIDataVote {
  readonly id: number;
  readonly nombre: string;
  readonly votaciones: any[];
  readonly resumen_votaciones: IAPISummatyVote;
}

export interface IAPISummatyVote {
  readonly apruebo: number;
  readonly rechazo: number;
  readonly me_abstengo: number;
  readonly me_inhabilito: number;
  readonly total_votos: number;
}

export interface UIEventCalendar<T=any> {
  id: number;
  title: string;
  display: string;
  start: string;
  end: string;
  backgroundColor: string;
  color: string;
  borderColor: string;
  textColor: string;
  classNames?: string[];
  extendedProps: UIExtendedProps<T>;
}

export interface AttendanceModel {
  readonly asistencia: boolean;
  readonly tipo: TipeAttendance;
  readonly sesion: number;
  readonly consejero: number;
}

export enum TipeAttendance {
  'PRESENCIAL' = 1,
  'ZOOM',
}
