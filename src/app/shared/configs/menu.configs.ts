import { ItemMenu } from "../interfaces";

export const MAIN_MENU: ItemMenu[] = [
  {
    id: 1,
    level: 1,
    title: 'Home',
    icon: 'fa-solid fa-house',
    selected: true,
    moduloBack: 'home',
    url: '/home'
  },
  {
    id: 2,
    level: 1,
    title: 'Calendarización',
    icon: 'fa-solid fa-calendar-days',
    moduloBack: 'calendarizacion',
    url: '/calendarizacion'
  },
  {
    id: 3,
    level: 1,
    title: 'Solicitudes',
    icon: 'fa-solid fa-file-circle-check',
    moduloBack: 'solicitudes',
    url: '/solicitud'
  },
  {
    id: 4,
    level: 1,
    title: 'Alertas',
    icon: 'fa-solid fa-bell',
    moduloBack: 'alertas',
    url: '/alertas'
  }
];
