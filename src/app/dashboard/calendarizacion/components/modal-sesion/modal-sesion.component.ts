import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { AdministrationService, AlertsService, EnvironmentModel, IAPIResponseSesion, IAPISummarySession, IApiResponseConvocatoria, IApiResponseUserID, IVotesIniciative, SesionService } from '@app/shared';
import { ModalController } from '@ionic/angular';
import { ENVIRONMENT } from 'src/environments/environment';

@Component({
  selector: 'app-modal-sesion',
  templateUrl: './modal-sesion.component.html',
  styleUrls: ['./modal-sesion.component.scss'],
})
export class ModalSesionComponent implements OnInit, OnChanges {
  public sessionID: number | null = null;
  public userLogin: IApiResponseUserID | null = null;
  public sessionData: IAPIResponseSesion | null = null;
  public callData: IApiResponseConvocatoria | null = null;
  public loadingSessionData: boolean = false;
  public voteData: IVotesIniciative[] = [];
  public isLoadingInitiatives: boolean = false;
  private _sesionService: SesionService = inject(SesionService);
  private _administrationService: AdministrationService = inject(AdministrationService);
  private alertsService: AlertsService = inject(AlertsService);
  private _env: EnvironmentModel = inject(ENVIRONMENT);

  get teamsName() {
    return this.sessionData ? this.sessionData?.equipos.map((t) => t.nombre).join(', ') : '-';
  }

  get title() {
    switch (this.sessionData?.estatus) {
      case 'CREADA':
        return 'Sesión';

      case 'CERRADA':
        return 'Sesión Cerrada';

      default:
        return 'Sesión';
    }
  }

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    if(this.sessionID) {
      this._getSessionData(this.sessionID);
    }
  }

  private _getSessionData(id: number) {
    this.loadingSessionData = true;
    this._sesionService.getSesionsByID(id).subscribe({
      next: (response) => {
        this.sessionData = response;

        if(response.convocatoria){
          this._getCallData(response.convocatoria.id_convocatoria);
        }
      },
      complete: () => {
        this.loadingSessionData = false;
        this._getSummarySession(Number(this.sessionData?.id));
      },
    });
  }

  private _getCallData(id: number) {
    this._administrationService.getCallById(id).subscribe({
      next: (response) => {
        this.callData = response;
        console.log(this.callData);
      },
      complete: () => {
        this.loadingSessionData = false;
      },
    });
  }

  private _getSummarySession(id: number) {
    this._sesionService.getSummarySession(id).subscribe({
      next: (response) => {
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

  openModalResumen() {
    const submitData = {
      openModalResumen: true,
    };

    return this.modalCtrl.dismiss(submitData, 'confirm');
  }

  handlePdf() {
    if (!this.callData?.documento_pdf) {
      this.alertsService.openSnackBar('¡La convocatoria seleccionada no tiene documento para mostrar!', 'error');
      return;
    }
    
    const urlRequest = `${this._env.urlFiles}${this.callData.documento_pdf}`;
    window.open(urlRequest);
  }
}
