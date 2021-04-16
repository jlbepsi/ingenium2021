import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import BaseApi from './base_api';
import {UserLdap} from '../share/model/userldap';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApi<UserLdap> {

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.usersApiURl);
  }

  getUsersOfClass(classe: string): Observable<UserLdap[]> {
    /** TODO enlevez l'appel */
    return super.apiGetAllWithOption2('classe/' +  classe);
  }

}
