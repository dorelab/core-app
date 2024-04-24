import { IApiResponseDetailKey } from "./data.interface";

export interface PasswordRecoverModel {
  codigo: string;
  password: string;
}

export interface ChangePasswordModel {
  old_password: string;
  password: string;
  confirm_password: string;
}

export interface ApiResponseModel {
  mensaje: string;
  estado: string;
}

export interface UserLoginModel {
  token: string;
  usuario_id: number;
  email: string;
  nombre: string;
  apellido: string;
  is_superuser: boolean;
  perfil: number;
  perfil_nombre: string;
  modulos: any[];
  msj: string;
  imagen: string;
  success: number;
  first_time: boolean;
  last_login: Date;
}

export interface IApiResponseUserID{
  readonly id:              number;
  readonly nombre:          string;
  readonly email:           string;
  readonly rut:             string;
  readonly telefono:        string;
  readonly partido:         IApiResponseDetailKey;
  readonly circunscripcion: IApiResponseDetailKey;
  readonly bancada:         IApiResponseDetailKey;
  readonly imagen:          string;
  readonly perfil:          'ADMINISTRADOR' | 'CONSEJERO';
  readonly estado:          boolean;
  readonly is_active:       boolean;
  readonly is_staff:        boolean;
  readonly is_superuser:    boolean;
  readonly equipos:         any[];
}
