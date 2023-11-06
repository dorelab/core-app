import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Sesion {
  id?: number;
  fecha?: Date;
  hora_inicio?: string;
  hora_fin?: string;
  tipo?: number;
  subtipo?: number;
  convocados?: number[];
  invitacion?: string;

  constructor( obj: Sesion = {} ){
    this.id = obj?.id ? obj?.id : 0;
    this.fecha = obj?.fecha;
    this.hora_inicio = obj?.hora_inicio;
    this.hora_fin = obj?.hora_fin;
    this.tipo = obj?.tipo;
    this.subtipo = obj?.subtipo;
    this.convocados = obj?.convocados;
    this.invitacion = obj?.invitacion;
  }

  static formControl(p: Sesion){
      return new FormGroup({
        fecha: new FormControl(p.fecha, [Validators.required]),
        hora_inicio: new FormControl(p.hora_inicio, [Validators.required]),
        hora_fin: new FormControl(p.hora_fin, [Validators.required, Validators.minLength(3)]),
        convocados: new FormControl(p.convocados, [Validators.required]),
        invitacion: new FormControl(p.invitacion, [Validators.required])
      });
  }
}
