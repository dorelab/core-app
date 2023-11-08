import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Sesion, IApiFilterCommon, UserService, ListData, IApiResponseUsers, SesionService } from '@app/shared';
import * as moment from 'moment';
import {  } from '@app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {
  formData: FormGroup;
  dataSesion: Sesion = new Sesion();
  selectedDate: Date | null = null;
  private _userService: UserService = inject(UserService);
  private _sesionService: SesionService = inject(SesionService);
  private _router: Router = inject(Router);
  public selected: Date | null = null;
  public users: ListData | null = null;
  public isShowResult: boolean = false;
  public messageResult = {
    icon:'checkmark-circle-outline',
    title:'Sesión Agendada',
    subTitle:'Su sesión ',
    showButton: true,
    buttonLabel: 'Volver'
  }

  get convocados(){
    return this.formData.get('convocados');
  }

  get hora_inicio(){
    return this.formData.get('hora_inicio');
  }
  get hora_fin(){
    return this.formData.get('hora_fin');
  }
  get fecha(){
    return this.formData.get('fecha');
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.formData = Sesion.formControl(this.dataSesion);
  }

  ngOnInit() {
    console.log('sesion');
    this._getUsers({
      perfil: '2'
    })
  }

  private _getUsers(filters:IApiFilterCommon | null){
    this._userService.getUsers(filters).subscribe({
      next:(response) => {
        this.users = new ListData(response, true, 10);
      }
    })
  }

  handleSelectUser(ids: number[]){
    this.convocados?.setValue(ids);
  }

  handleSubmit(){
    this._sesionService.createPrivateSession({
      ...this.formData.getRawValue(),
      hora_fin: moment(this.hora_fin?.value, ["h:mm A"]).format("HH:mm:ss"),
      hora_inicio: moment(this.hora_inicio?.value, ["h:mm A"]).format("HH:mm:ss"),
      tipo: 3
    }).subscribe({
      complete:() => {
        this.isShowResult = true;
      }
    })
  }

  handleDate(event: Date){
    const dateTransform = moment(event).format('YYYY-MM-DD');
    this.fecha?.patchValue(dateTransform)
  }

  handleFilter(query:string){
    this._getUsers({
      perfil: '2',
      nombre__contains: query
    })
  }

  handleClearFilter(){
    this._getUsers({
      perfil:'2'
    })
  }

  handlePageResultEvent(){
    this.isShowResult = false;
    this._router.navigate(['calendarizacion'])

  }

}
