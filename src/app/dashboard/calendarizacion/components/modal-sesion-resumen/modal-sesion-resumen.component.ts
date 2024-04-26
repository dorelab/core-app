import { Component, OnInit, inject } from '@angular/core';
import { AdministrationService, IAPIResponseSesion, IAPISummarySession, IApiResponseConvocatoria, IApiResponseUserID, IVotesIniciative, SesionService } from '@app/shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-sesion-resumen',
  templateUrl: './modal-sesion-resumen.component.html',
  styleUrls: ['./modal-sesion-resumen.component.scss'],
})

export class ModalSesionResumenComponent implements OnInit {
  public sessionID: number | null = null;
  public userLogin: IApiResponseUserID | null = null;
  public sessionData: IAPIResponseSesion | null = null;
  public callData: IApiResponseConvocatoria | null = null;
  public voteData: IVotesIniciative[] = [];
  public attendanceRecord: any[] = [];
  public summarySession: IAPISummarySession | null = null;
  public asistencia: string = '';
  private _sesionService: SesionService = inject(SesionService);
  private _administrationService: AdministrationService = inject(AdministrationService);

  get teamsName() {
    return this.callData ? this.callData?.equipos.map((t) => t.nombre).join(', '):'-'
  }

  constructor(
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    if(this.sessionID) {
      this._getSessionData(this.sessionID);
    }
  }

  private _getSessionData(id: number) {
    this._sesionService.getSesionsByID(id).subscribe({
      next: (response) => {
        this.sessionData = response;
        if(response.convocatoria){
          this._getCallData(response.convocatoria.id_convocatoria);
        }
      },
      complete: () => {
        this._getSummarySession(Number(this.sessionData?.id));
      },
    });
  }

  private _getCallData(id: number) {
    this._administrationService.getCallById(id).subscribe({
      next: (response) => {
        this.callData = response;
      }
    });
  }

  private _getSummarySession(id: number) {
    this._sesionService.getSummarySession(id).subscribe({
      next: (response) => {
        this.summarySession = response;
        this.attendanceRecord = response.asistentes;
        this.voteData = this._getDataVote(response);
      }
    });
  }

  private _getDataVote(data: IAPISummarySession): IVotesIniciative[] {
    if (!data.datos_votaciones.length) return [];

    return data.datos_votaciones.map((item) => ({
      ...item,
      display_apruebo: item.resumen_votaciones.apruebo,
      display_rechazo: item.resumen_votaciones.rechazo,
      display_me_abstengo: item.resumen_votaciones.me_abstengo,
      display_me_inhabilito: item.resumen_votaciones.me_inhabilito,
      display_total_votos: item.resumen_votaciones.total_votos,
    }));
  }

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
