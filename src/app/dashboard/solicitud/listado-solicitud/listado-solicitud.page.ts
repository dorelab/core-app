import { Component, OnInit, inject } from '@angular/core';
import { IRequestModel, RequestService, TableData, UserLoginModel, getLocalStorageUser } from '@app/shared';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listado-solicitud',
  templateUrl: './listado-solicitud.page.html',
  styleUrls: ['./listado-solicitud.page.scss'],
})
export class ListadoSolicitudPage implements OnInit {
  infoUser: UserLoginModel;
  private _RequestService: RequestService = inject(RequestService);
  public RequestList: IRequestModel[] = [];
  public RequestFinishedList: IRequestModel[] = [];

  constructor(private route: ActivatedRoute) {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.getListRequest({filters: {consejero__id: this.infoUser.usuario_id}, loadListFinish: true});
    });
  }

  getListRequest(event: any) {
    const { filters, loadListFinish } = event;

    this._RequestService
      .getListRequest(filters)
      .subscribe({
        next:(list) => {
          list.map((request: IRequestModel) => {
            request.consejero_nombre = request.consejero?.id ? request.consejero?.nombre : '-';
          });

          const listFinish = list.filter(
            (row: any) => row.terminada
          );

          list = list.filter(
            (row: any) => !row.terminada
          );

          list.map((request: IRequestModel) => {
            const requestLimitDate = moment(request.fecha_limite, 'DD/MM/YYYY');
            const currentDate = moment(new Date(), 'DD/MM/YYYY');
            const duration = requestLimitDate.diff(currentDate, 'days');

            switch (true) {
              case (duration >= 16):
                request.status = 'VERDE';
                return;

              case (duration >= 8 && duration <= 15):
                request.status = 'AMARILLO';
                return;

              case (duration <= 7):
                request.status = 'ROJO';
                return;

              default:
                request.status = 'VERDE';
                return;
            }
          });

          this.RequestList = list;

          if(loadListFinish)
            this.RequestFinishedList = listFinish;
        }
      });
  }

}
