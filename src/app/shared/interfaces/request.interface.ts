import { FormControl } from '@angular/forms';

export interface IRequestModel {
  id?: number;
  tipo?: number | null;
  descripcion?: string;
  observaciones?: string;
  fecha_solicitud?: Date;
  fecha_limite?: Date;
  estado?: boolean;
  terminada?: boolean;
  consejero?: DataConsejero;
  consejero_nombre?: string;
  sesion?: SesionRequesModel;
  archivo?: string;
  archivo_nombre?: string;
  fecha_solicitud_format?: string | null | undefined;
  fecha_limite_format?: string | null | undefined;
  status?: string;
}

export interface SesionRequesModel {
  id?: number;
  nombre?: string;
}

export interface DataConsejero {
  readonly id: number;
  readonly nombre: string;
}

export interface ITypeRequestModel {
  readonly id: number;
  readonly nombre: string;
}

export interface RequestFiltersForm {
  consejero__id: FormControl<number>;
  tipo: FormControl<number[]>;
  search: FormControl<string>;
  fecha_solicitud__lte: FormControl<string>;
  fecha_solicitud__gte: FormControl<string>;
}

export interface RequestForm {
  tipo: FormControl<number | null>;
  descripcion: FormControl<string>;
  observaciones: FormControl<string>;
  fecha_solicitud: FormControl<string>;
  fecha_limite: FormControl<string>;
  consejero: FormControl<number | null>;
  sesion: FormControl<number | null>;
  archivo_: FormControl<string>;
}

export interface ResponseRequestForm {
  solicitud: FormControl<number>;
  respuesta: FormControl<string>;
  archivo: FormControl<File | string | null>;
}

export interface ResponseRequestModel {
  id?: number;
  solicitud?: number;
  respuesta?: string;
  archivo?: string;
  archivo_nombre?: string;
}

export interface RequestFilters {
  tipo?: number[]|null;
  search?: string|null;
  fecha_inicio?: string|null;
  fecha_termino?: string|null;
  fecha_solicitud?: Date|null;
}
