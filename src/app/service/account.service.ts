import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {DatabaseAccount} from '../share/model/database-account';
import {LOGINSERVERMYSQL} from '../share/model/loginservermysql4';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApi<DatabaseAccount>{

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.databaseAccountApiURl);
  }

  getAccounts(login: string): Observable<DatabaseAccount[]> {
    return super.apiGetAllWithOption('userLogin/' + login);
  }
  getServerAccounts(serverId: number): Observable<DatabaseAccount[]> {
    return super.apiGetAllWithOption('serverId/' + serverId);
  }

  getLoginServerAccounts(serverId: number): Observable<string[]> {
    // problème avec le type de retour
    return this.httpClient.get<string[]>(
      this.getUrl(serverId.toString()), {
        headers: BaseApi.getHttpOptions()
      }
    );
  }

  /*
  getAccount(id) {
    return super.apiGet(id);
  }

  addAccount(account) {
    const newAccount =
      {
        "serverId": account.serverId,
        "userLogin": account.user,
        "password": account.password,
      };

    return super.apiPost(newAccount);
  }

  updateAccount(account) {
    const accountUpdated =
      {
        "serverId": account.serverId,
        "userLogin": account.user,
        "password": account.password,
      };

    return super.apiPut(accountUpdated.serverId, accountUpdated);
  }

  deleteAccount(account) {
    const accountDeleted =
      {
        "serverId": account.serverId,
        "userLogin": account.user,
      };

    return super.apiDeleteWithURL(accountDeleted.serverId, accountDeleted);
  }
   */
}
