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
  success: boolean;
  first_time: boolean;
  last_login: Date;
}
