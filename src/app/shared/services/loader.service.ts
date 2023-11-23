import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  controlerLoader: any = false;

  constructor(
    public loadingController: LoadingController
  ) {
  }

  async show() {
    this.isLoading.next(true);

    this.controlerLoader = await this.loadingController.create({
      message: 'Cargando...'
    }).then((response) => {
      response.present();
    });
  }

  hide() {
    this.isLoading.next(false);

    setTimeout(async ()=>{
      await this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
      }).catch((err) => {
        console.log('Error occured : ', err);
      });
    }, 1000);

    /*if(this.controlerLoader) {
      await this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
      }).catch((err) => {
        console.log('Error occured : ', err);
      });
    }*/

  }
}
