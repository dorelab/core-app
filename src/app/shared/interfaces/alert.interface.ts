import { FormControl } from '@angular/forms';

export interface AlertModel {
  readonly id: number;
  readonly tipo: string;
  readonly fecha: Date;
  fecha_format?: string | null | undefined;
  readonly descripcion: string;
  readonly visto: boolean;
  readonly estado: boolean;
  readonly usuario: number;
}

export interface AlertFiltersForm {
  usuario__id: FormControl<number>;
  search: FormControl<string>;
  tipo: FormControl<number|string>;
}

export interface AlertTypeModel {
  readonly id: number;
  readonly nombre: string;
}

export const ALERTS_TYPES: AlertTypeModel[] = [
  {
    id: 1,
    nombre: 'VOTACIONES DE LAS SESIONES'
  },
  {
    id: 2,
    nombre: 'NUEVA SESIÓN AGENDADA'
  },
  {
    id: 3,
    nombre: 'NUEVA INFORMACIÓN DE PROYECTO'
  },
]
