import { inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { UserLoginModel } from '../interfaces';
import { AuthService } from './auth.service';

export const FCM_TOKEN = 'push_notification_token';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _redirect = new BehaviorSubject<any>(null);
  private _authService: AuthService = inject(AuthService);

  get redirect() {
    return this._redirect.asObservable();
  }

  constructor(
    private storage: StorageService
  ) { }

  initPush(data: UserLoginModel) {    
    if(Capacitor.getPlatform() !== 'web') {
      this.registerPush(data);
      //this.getDeliveredNotifications();
    }
  }

  private async registerPush(dataUser: UserLoginModel) {
    try {
      await this.addListeners(dataUser);

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    } catch(e) {
      console.log(e);
    }
  }

  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  addListeners(dataUser: UserLoginModel) {
    PushNotifications.addListener(
      'registration',
      async(token: Token) => {
        console.log('My token: ', token);
        console.log('User: ', dataUser);
        const fcm_token = (token?.value);
        const dataToken = {
          token: fcm_token,
          plataforma: Capacitor.getPlatform()
        };

        this._authService.updateTokenUser(dataUser.usuario_id, dataToken).subscribe({
          complete: () => {
            console.log('Token & Plataform Update');
          },
        });

        let go = 1;
        const saved_token = JSON.parse((await this.storage.getStorage(FCM_TOKEN)).value);

        if(saved_token) {
          if(fcm_token == saved_token) {
            go = 0;
          } else {
            go = 2;
          }
        }

        if(go == 1) {
          this.storage.setStorage(FCM_TOKEN, JSON.stringify(fcm_token), dataUser);
        } else if(go == 2) {
          // update token
          const data = {
            expired_token: saved_token,
            refreshed_token: fcm_token
          };

          this.storage.setStorage(FCM_TOKEN, fcm_token, dataUser);
        }
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        const data = notification?.data;
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        //console.log('Action performed: ' + JSON.stringify(notification.notification));
        //console.log('push data: ', data);
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );
  }

  async removeFcmToken() {
    try {
      const saved_token = JSON.parse((await this.storage.getStorage(FCM_TOKEN)).value);
      this.storage.removeStorage(saved_token);
    } catch(e) {
      console.log(e);
      throw(e);
    }

  }
}