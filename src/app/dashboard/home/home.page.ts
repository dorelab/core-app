import { Component, OnInit } from '@angular/core';
import { getLocalStorageUser } from '../../shared/helpers/auth.helpers';
import { ItemMenu, LINKS, LinksModel, MAIN_MENU } from '@app/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  infoUser: any;
  botones: ItemMenu[] = MAIN_MENU;
  logos: LinksModel[] = LINKS;

  constructor() {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {}
}
