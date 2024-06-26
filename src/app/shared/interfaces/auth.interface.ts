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
  perfil: PerfilLoginModel;
  perfil_nombre: string;
  modulos: any[];
  msj: string;
  imagen: string;
  success: number;
  first_time: boolean;
  last_login: Date;
}

export interface PerfilLoginModel {
  id_perfil: number;
  nombre_perfil: string;
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
  readonly perfil:          number;
  readonly nombre_perfil:   'ADMINISTRADOR/A' | 'CONSEJERO/A' | 'PRESIDENTE/A DEL CONSEJO';
  readonly id_perfil:       number;
  readonly estado:          boolean;
  readonly is_active:       boolean;
  readonly is_staff:        boolean;
  readonly is_superuser:    boolean;
  readonly equipos:         any[];
  readonly usuario_id:      number;
}
