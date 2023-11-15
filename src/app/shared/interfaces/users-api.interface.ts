import { FormControl } from '@angular/forms';
import { IApiResponseDetailKey } from './data.interface';

export interface IApiUser {
  readonly nombre: string;
  readonly email: string;
  readonly rut: string;
  readonly telefono: string;
  readonly circunscripcion: string;
  readonly password: string;
  readonly confirm_password: string;
  readonly estado: boolean;
  readonly is_active: boolean;
}

export interface IApiRequestUsers extends IApiUser {
  readonly imagen?: File;
  readonly bancada: number;
  readonly partido: number;
  readonly perfil: number;
}

export interface IApiResponseUsers extends IApiUser {
  readonly id: number;
  readonly is_staff: boolean;
  readonly is_superuser: boolean;
  readonly imagen?: string;
  readonly bancada: IApiResponseDetailKey;
  readonly partido: IApiResponseDetailKey;
  readonly perfil: string;
  readonly equipos:any[] //TODO: VALIDAR
}

export interface IApiResponseLogin {
  readonly token:string;
  readonly usuario_id:number;
  readonly email:string;
  readonly nombre:string;
  readonly is_superuser:boolean;
  readonly perfil:number; //TODO: VALIDAR
  readonly partido_politico:IApiResponseDetailKey;
  readonly bancada:IApiResponseDetailKey;
  readonly modulos:string[];
  readonly success:number;
  readonly first_time:boolean;
}

export interface IApiResponseTypeProfile {
  readonly id: number;
  readonly nombre: string;
}

export interface IApiRequestAssignTeams {
  readonly usuario_id:number;
  readonly equipos:number[]
}

export interface IApiRequestRemoveAssign {
  readonly usuario_id:number;
}

export interface IUserForm {
  nombre: FormControl<string>;
  email: FormControl<string>;
  rut: FormControl<string>;
  telefono: FormControl<string | null>;
  circunscripcion: FormControl<string>;
  bancada: FormControl<number | null>;
  partido: FormControl<number | null>;
  perfil: FormControl<number | null>;
  password: FormControl<string>;
  confirm_password: FormControl<string>;
  imagen: FormControl<File | string | null>;
  estado:FormControl<boolean>;
  is_active:FormControl<boolean>;
}

export interface IUserHomeForm {
  nombre: FormControl<string>;
  email: FormControl<string>;
  rut: FormControl<string>;
  telefono: FormControl<string | null>;
  circunscripcion: FormControl<string>;
  bancada: FormControl<number | null>;
  partido: FormControl<number | null>;
  perfil: FormControl<number | null>;
  imagen: FormControl<File | string | null>;
  estado:FormControl<boolean>;
  is_active:FormControl<boolean>;
}

