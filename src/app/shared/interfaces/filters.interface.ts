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
