import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { getToken, removeUserToken } from '../helpers/auth.helpers';
import { Router } from '@angular/router';
import { ChangePasswordModel, IApiFilterParties, IApiResponseParties, IApiResponseUserID, PasswordRecoverModel } from '../interfaces';
import { IApiFilterCommon } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private path = 'usuario';

  constructor(
    private apiService: ApiService,
  ) {}

}
