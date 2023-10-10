import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Usuario {
  id?: number;
  organizacion?: number;
  universidad?: number;
  nombre?: string;
  telefono?: string;
  email?: string;
  confirmar_email?: string;
  rut?: string;
  cargo?: string;
  contrasenna?: string;
  repetir_contrasenna?: string;
  unidad?: string;
  direccion?: string;
  linkedin?: string;
  curriculum?: string;
  avatar?: string;

  constructor( obj:Usuario = {} ){
    this.id = obj?.id ? obj?.id : 0;
    this.organizacion = obj?.organizacion;
    this.universidad = obj?.universidad;
    this.nombre = obj?.nombre;
    this.telefono = obj?.telefono;
    this.email = obj?.email;
    this.confirmar_email = obj?.confirmar_email;
    this.rut = obj?.rut;
    this.cargo = obj?.cargo;
    this.contrasenna = obj?.contrasenna;
    this.repetir_contrasenna = obj?.repetir_contrasenna;
    this.unidad = obj?.unidad;
    this.direccion = obj?.direccion;
    this.linkedin = obj?.linkedin;
    this.curriculum = obj?.curriculum;
    this.avatar = obj?.avatar;
  }

  static formControl(p: Usuario){
      return new FormGroup({
        organizacion: new FormControl(p.organizacion, [Validators.required]),
        universidad: new FormControl(p.universidad, [Validators.required]),
        nombre: new FormControl(p.nombre, [Validators.required, Validators.minLength(3)]),
        telefono: new FormControl(p.telefono, []),
        email: new FormControl(p.email, [Validators.required]),
        confirmar_email: new FormControl(p.confirmar_email, [Validators.required]),
        rut: new FormControl(p.rut, [Validators.required]),
        cargo: new FormControl(p.cargo, [Validators.required]),
        contrasenna: new FormControl(p.contrasenna, [Validators.required, Validators.minLength(8)]),
        repetir_contrasenna: new FormControl(p.repetir_contrasenna, [Validators.required, Validators.minLength(8)]),
        unidad: new FormControl(p.unidad, [Validators.required]),
        direccion: new FormControl(p.direccion, [Validators.required]),
        linkedin: new FormControl(p.linkedin, []),
        curriculum: new FormControl(p.curriculum, []),
        avatar: new FormControl(p.avatar, []),
      });
  }
}
