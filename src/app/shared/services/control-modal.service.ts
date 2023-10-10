import { Observable, from, switchMap, tap } from 'rxjs';
import { ComponentRef, Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ControlModalService {
  constructor(private modalCtrl: ModalController) {}

 /**
  * It creates a modal, presents it, and returns an observable that emits when the modal is dismissed
  * @param {ModalOptions} opts - ModalOptions - This is the options object that you would normally pass
  * to the create() method.
  * @returns Observable<any>
  */
  create(opts: ModalOptions): Observable<any> {
    return from(this.modalCtrl.create(opts)).pipe(
      tap((modal) => modal.present()),
      switchMap((modal) => modal.onDidDismiss())
    );
  }
}
