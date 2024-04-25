import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { AdministrationService, SchedulingService, AlertsService, IAPIIniciativa, IAPIResponseSesion, IApiResponseConvocatoria, IApiResponseUserID, IVotesIniciative, SesionService, getLocalStorageUser } from '@app/shared';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

type TIniciatives = IAPIIniciativa & { vote: number | null, voto_usuario: string | null }

@Component({
  selector: 'app-modal-votar',
  templateUrl: './modal-votar.component.html',
  styleUrls: ['./modal-votar.component.scss'],
})
export class ModalVotarComponent implements OnInit {
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
  private _schedulingService: SchedulingService = inject(SchedulingService);
  public initiatives: TIniciatives[] = [];
  public votoInitiatives: any[] = [];

  get teamsName() {
    return this.callData ? this.callData?.equipos.map((t) => t.nombre).join(', '):'-';
  }

  constructor(
    private modalCtrl: ModalController
  ) {
  }

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
        const initiativesID = response.iniciativas.map((i: any) => i.id);
        this._getInitiatives(initiativesID);

        if(response.convocatoria){
          this._getCallData(response.convocatoria.id_convocatoria);
        }
      },
    });
  }

  private _getCallData(id: number) {
    this._administrationService.getCallById(id).subscribe({
      next: (response) => {
        this.callData = response;
      },
      complete: () => {
        this.loadingSessionData = false;
      },
    });
  }

  private _getInitiatives(ids: number[]) {
    this.isLoadingInitiatives = true;

    const initiatives$ = ids.map((id) => 
      this._administrationService.getIniciativaById(id)
    );

    forkJoin(initiatives$).subscribe({
      next: (response) => {
        this.initiatives = response.map((item) => {
          let votoUsuario = null;

          if (this.userLogin) {
            votoUsuario = item.votos.filter((voto: any) => (voto.consejero.consejero_id === this.userLogin?.usuario_id));
          }

          return {...item, vote: votoUsuario.length ? this.returnVotoID(votoUsuario[0].opcion) : null, voto_usuario: votoUsuario.length ? votoUsuario[0].opcion : null };

        });
      },
      complete: () => {
        this.isLoadingInitiatives = false;
      },
    });
  }

  handleVote(item: TIniciatives){
    if (!item.vote) {
      this.alertsService.openSnackBar('¡Debe seleccionar una opción para continuar!', 'error');
      return;
    }

    if(!this.userLogin) {
      return;
    }

    this._schedulingService.vote({
      consejero: this.userLogin.usuario_id,
      iniciativa: item.id,
      opcion: Number(item.vote)
    }).subscribe({
      next: (response) => {
        if(response.id && this.sessionID) {
          this._getSessionData(this.sessionID);
        }
      },
      complete: () => {
        this.alertsService.openSnackBar('¡El voto fue asignado correctamente!', 'success');
      }
    })
  }

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  saveData() {
    const submitData = {
      body: {},
    };

    return this.modalCtrl.dismiss(submitData, 'confirm');
  }

  returnVotoID(votoTexto: string) {
    if (votoTexto === 'APRUEBO') {
      return 1;

    } else if (votoTexto === 'RECHAZO'){
      return 2;

    } else if (votoTexto === 'ME ABSTENGO'){
      return 3;

    } else {
      return 4;

    }
  }
}
