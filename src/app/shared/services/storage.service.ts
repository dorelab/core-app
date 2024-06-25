import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { from, Observable } from 'rxjs';
import { UserLoginModel } from '../interfaces';
import { AuthService } from './auth.service';

export const APP_TOKEN = 'app_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _authService: AuthService = inject(AuthService);

  constructor() { }

  setStorage(key: string, value: any, dataUser: UserLoginModel) {
    Preferences.set({key: key, value: value});
  }

  getStorage(key: string): any {
    // Preferences.migrate();
    return Preferences.get({key: key});
  }

  removeStorage(key: string) {
    Preferences.remove({key: key});
  }

  clearStorage() {
    Preferences.clear();
  }

  getToken(): Observable<any> {
    return from(this.getStorage(APP_TOKEN));    
  }
  
}
