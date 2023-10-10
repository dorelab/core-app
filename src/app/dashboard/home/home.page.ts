import { Component, OnInit } from '@angular/core';
import { getLocalStorageUser } from '../../shared/helpers/auth.helpers';
import { ItemMenu, MAIN_MENU } from '@app/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  infoUser: any;
  botones: ItemMenu[] = MAIN_MENU;
  logos: string[] = [
    'logo-home1.png',
    'logo-home2.jpg',
    'logo-home3.png',
    'logo-home4.png'
  ];

  constructor() {
    this.infoUser = JSON.parse(getLocalStorageUser() || '');
  }

  ngOnInit() {}
}
