import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {DatabaseAccount, DatabaseAccountApiModel} from '../share/model/database-account';

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
      this.getUrl('serverid/' + serverId.toString()), {
        headers: BaseApi.getHttpOptions()
      }
    );
  }

  addAccount(account: DatabaseAccountApiModel): Observable<DatabaseAccount> {
    return super.apiPost(account);
  }

  updateAccount(account: DatabaseAccountApiModel): Observable<object> {
    return super.apiPut(account.serverId.toString(), account);
  }

  deleteAccount(accountDeleted: DatabaseAccountApiModel): Observable<object> {
    return super.apiDeleteWithURL(accountDeleted.serverId.toString(), accountDeleted);
  }
}
