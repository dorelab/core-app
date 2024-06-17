import { TypeEvents } from "./scheduling.interface";

export interface IApiFilterCommon {
  readonly page?: number;
  readonly page_size?: number;
  readonly nombre__contains?: string;
  readonly search?: string;
  readonly email__contains?: string;
  readonly rut?: string;
  readonly perfil?: string;
  readonly partido__nombre__contains?: string;
  readonly bancada__nombre__contains?: string;
}

export interface IApiFiltersConvocatoria {
  readonly sesion__asistentes__id?: string;
  readonly iniciativas__nombre__contains?: string;
  readonly equipos__id?: string;
  readonly search?: string;
}

export interface IAPIFilterSession {
  readonly convocados__id?: string;
  readonly nombre?: string;
  readonly iniciativas__nombre__contains?: string;
  readonly iniciativas__informacion__contains?: string;
  readonly fecha__gte?: string;
  readonly fecha__lte?: string;
  readonly tipo?: string;
  readonly search?: string;
}

export interface EventsModelsFilters {
  readonly sesion__convocados__id?: number | string;
  readonly sesion__equipos__id?: number | string;
  readonly sesion__tipo?: number;
  readonly sesion__id?: number | string;
  readonly tipo_evento?: TypeEvents;
  readonly fecha__gte?: string;
  readonly fecha__lte?: string;
  readonly search?: string;
}

export interface EventsModelsResponse {
  readonly id: number;
  readonly nombre: string;
  readonly tipo_evento: number;
  readonly invitacion: string;
  readonly link_zoom: string | null;
  readonly fecha: string;
  readonly sesion: any;
  readonly documento_pdf: string | null;
  readonly efemeride?: Efemeride;
  readonly cumpleanno?: Cumpleanno;
}

export interface Efemeride {
  readonly id: number;
  readonly nombre: string;
  readonly descripcion: string;
  readonly fecha: string;
  readonly fecha_anual?:string;
}

export interface Cumpleanno {
  readonly id: number;
  readonly nombre: string;
  readonly descripcion: string;
  readonly fecha: string;
  readonly fecha_anual?:string;

}
