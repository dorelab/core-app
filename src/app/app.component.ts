import { Component, EnvironmentInjector, Optional, inject } from '@angular/core';
import { AlertController, IonRouterOutlet, IonicModule, Platform, ToastController } from '@ionic/angular';
import { AlertsService } from './shared/services';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { MatSnackBar } from '@angular/material/snack-bar';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
    tap = 0;
    public environmentInjector = inject(EnvironmentInjector);

    constructor(
      private platform: Platform,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController,
      public alertsService: AlertsService,
      public snackBar: MatSnackBar,
      @Optional() private routerOutlet?: IonRouterOutlet
    ) {
      this.platform.ready().then(() => {
        this.exitAppOnDoubleTap();
        // this.exitAppOnAlert();
      });
    }

    exitAppOnAlert() {
      if(Capacitor.getPlatform() == 'android') {
        this.platform.backButton.subscribeWithPriority(10, async() => {
          if (!this.routerOutlet?.canGoBack()) {
            this.alertExit();
          }
        });
      }
    }

    exitAppOnDoubleTap() {
      if(Capacitor.getPlatform() === 'android') {
        this.platform.backButton.subscribeWithPriority(10, async() => {
          if (!this.routerOutlet?.canGoBack()) {
              this.tap++;

              if (this.tap == 2) {
                // App.exitApp();
                this.tap = 0;
                this.exitAppOnAlert();
              } else {
                this.doubleTapExitToast();
              }
          }
        });
      }
    }

    async doubleTapExitToast() {
      const snackBarRef = this.snackBar.open('¡Presione nuevamente para salir de la Aplicación!', '', {
        duration: 3000,
        panelClass: ['info-alert'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

      snackBarRef.afterDismissed().subscribe(info => {
        this.tap = 0;
      });
    }

    async alertExit() {
      const alert = await this.alertCtrl.create({
        header: 'Salir de la Aplicación',
        message: '¿Está seguro de que desea salir de la Aplicación?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel'
          },
          {
            text: 'SI',
            role: 'confirm',
            handler: () => { App.exitApp(); }
          }
        ],
      });
      alert.present();
    }
}
