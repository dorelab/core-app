export interface IAPIResponseSesion {
  readonly id: number;
  readonly fecha: string;
  readonly hora_inicio: string;
  readonly hora_fin: string;
  readonly tipo: string;
  readonly subtipo: number;
  readonly invitacion: string;
  readonly asistentes: IAPISesionAsistente[];
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

/** Vote */
export interface IAPIRequestVote {
  readonly opcion: number;
  readonly iniciativa: number;
  readonly consejero: number;
}


export interface IAPIResponseVote extends IAPIRequestVote{
  readonly id:number;
}
