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
