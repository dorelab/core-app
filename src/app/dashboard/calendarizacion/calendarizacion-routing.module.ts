import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarizacionPage } from './calendarizacion.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarizacionPageRoutingModule {}
