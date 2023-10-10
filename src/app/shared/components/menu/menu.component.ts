import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMenu } from '../../interfaces';
import { Store } from '@ngrx/store';
import * as FromLogin from '@app/login-store';
import {
  ControlModalService,
  UserLoginModel
} from '@app/shared';
import { MAIN_MENU } from '../../configs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  opcionesMenuFiltradas: ItemMenu[] = [];
  selectedIndex: number = 0;
  itemsChildren: ItemMenu[] = [];
  idPadre: number = 0;
  displayModal: boolean = false;
  userLogin$: Observable<UserLoginModel | null> = this.storeLogin.select(
    FromLogin.getUserLogin
  );
  userLogin: UserLoginModel | null = null;
  appPages: ItemMenu[] = MAIN_MENU;

  constructor(
    private storeLogin: Store<FromLogin.State>,
    private controlModalService: ControlModalService,
  ) {}

  ngOnInit() {
    this.userLogin$.subscribe((u) => {
      this.userLogin = u;
      this.filtrarMenu();
    });
  }

  filtrarMenu() {
    const modulosAutorizadosMenu = this.userLogin?.modulos;

    this.opcionesMenuFiltradas = this.appPages.filter(o => {
      if (modulosAutorizadosMenu) {
        return modulosAutorizadosMenu.includes(o.moduloBack);
      }

      return [];
    });
  }

  onAction(item: any) {
    if(item.evento !== undefined) {
      //@ts-ignore
      this[item.evento]();
    }

  }
}
