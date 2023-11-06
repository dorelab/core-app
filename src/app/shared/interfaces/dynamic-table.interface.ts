export interface ColumnsListModel {
  field: string;
  displayName?: string;
  type?: 'button' | 'text' | 'date' | 'number' | 'checkbox' | 'status';
  statusConditions?:{
    value:string;
    color:string;
  }[];
  isEnableSort?: boolean;
  isEnableSticky?: boolean;
  width?:string;
  buttons?: ButtonsListModel[];
}

export interface ButtonsListModel {
  id: string | number;
  typeButton?: 'Stroked' | 'Flat' | 'Icon' | 'Mini FAB';
  isShowIcon?: boolean;
  iconName?: string;
  label?: string;
  backgroundColor?: string;
  color?: string;
  conditions?:conditionModel
}

export interface conditionModel {
  key: string;
  value: unknown[] | unknown;
}

export interface DataSetListModel {
  count: number;
  next: string | null;
  previous:string | null;
  results: any[];
}

export interface configsTableModel{
  isPagination:boolean;
  isLazy?:boolean;
  pageSizeOptions?:number[];
  pageSize?:number;
  isActiveFilters?:boolean;
  isMultiSelection?:boolean;
}
