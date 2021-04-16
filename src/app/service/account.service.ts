import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {DatabaseAccount} from '../share/model/database-account';
import {ACCOUNTS_MOCK} from '../share/model/account-mock.data';
import {LOGINSERVERMYSQL} from '../share/model/loginservermysql4';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApi<DatabaseAccount>{

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.databaseAccountApiURl);
  }

  getAccounts(login: string): Observable<DatabaseAccount[]> {
    /** TODO : Faire AccountService avec l'API */
    return of(ACCOUNTS_MOCK);
    // return super.apiGetAllWithOption('userLogin/' + login);
  }
  getServerAccounts(serverId: number): Observable<DatabaseAccount[]> {
    // return super.apiGetAllWithOption('serverId/' + serverId);
    return of(ACCOUNTS_MOCK.filter(a => a.server.id === serverId));
  }

  getLoginServerAccounts(serverId: number): Observable<string[]> {
    // return super.apiGetAllWithOption('serverId/' + serverId);
    return of(LOGINSERVERMYSQL);
  }

}
