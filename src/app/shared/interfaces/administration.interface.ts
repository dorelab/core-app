export interface UniversityModel {
  id: string;
  nombre: string;
  estado?: string;
  creado?: string;
}

export interface CenterAdminModel {
  id: string;
  nombre: string;
  universidad: UniversityModel;
  descripcion: string;
  estado?: string;
  creado?: string;
}

export interface ServicesModel {
  id: string;
  descripcion: string;
  centro: CenterAdminModel;
  estado?: string;
  creado?: string;
}

export interface EquipmentsModel {
  id: string;
  descripcion: string;
  centro: CenterAdminModel;
  estado?: string;
  creado?: string;
}

export interface UniversityCreateModel {
  nombre: string;
}

export interface CenterCreateModel {
  nombre: string;
  universidad: number;
  descripcion: string;
}

export interface CapacityCreateModel {
  descripcion: string;
  centro: number;
}

/*****  ZONA  *****/
export interface RegionModel {
  id: string;
  nombre: string;
  estado?: string;
  creado?: string;
}

export interface ComunaAdminModel {
  id: string;
  nombre: string;
  region: RegionModel;
  estado?: string;
  creado?: string;
}

export interface RegionCreateModel {
  nombre: string;
}

export interface ComunaCreateModel {
  nombre: string;
  region: number;
}
