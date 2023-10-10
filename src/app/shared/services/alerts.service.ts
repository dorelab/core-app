import { Injectable } from "@angular/core";
import { 
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public snackBar: MatSnackBar
  ) { }
  
  openSnackBar(message: string, type?: string, tiempo = 4000, py?: MatSnackBarVerticalPosition, px?: MatSnackBarHorizontalPosition) {
    let claseAlert = 'info-alert';
    let iconAlert = '<span class="material-icons">info</span>';

    if (type === 'error') {
      claseAlert = 'error-alert';
      iconAlert = '<span class="material-icons">error</span>';
    }

    if (type === 'success') {
      claseAlert = 'success-alert';
      iconAlert = '<span class="material-icons">check_circle</span>';
    }
    if(type === 'info'){
      claseAlert =  'info-alert';
      iconAlert = '<span class="material-icons">info</span>';
    }

    const msjAlert = message;

    this.snackBar.open(msjAlert, '', {
        duration: tiempo,
        panelClass: [claseAlert],
        horizontalPosition: (px !== undefined ? px : this.horizontalPosition),
        verticalPosition: (py !== undefined ? py : this.verticalPosition),
     });
  }
}
