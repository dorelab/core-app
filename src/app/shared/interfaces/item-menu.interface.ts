export interface ItemMenu {
  id: number,
  level: number,
  title: string,
  url?: string,
  icon: string,
  moduloBack?: string,
  children?: ItemMenu[],
  open?: boolean,
  evento?: any,
  selected?: boolean,
}
