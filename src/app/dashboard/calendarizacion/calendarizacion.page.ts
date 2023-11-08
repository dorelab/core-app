import { Component, OnInit } from '@angular/core';
import { ControlModalService } from '@app/shared';
import { ModalVotarComponent } from './components/modal-votar/modal-votar.component';

@Component({
  selector: 'app-calendarizacion',
  templateUrl: './calendarizacion.page.html',
  styleUrls: ['./calendarizacion.page.scss'],
})
export class CalendarizacionPage implements OnInit {

  constructor(
    private controlModalService: ControlModalService,
  ) { }

  ngOnInit() {
    console.log('calendarizacion');
  }

  addSesion() {
    this.controlModalService
      .create({
        component: ModalVotarComponent,
        cssClass: 'custom_modal',
      })
      .subscribe(({ data }) => {
        if (data) {
          console.log(data);
        }
      });
  }

}
