import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Database} from '../share/model/database';
import {DATABASE_MOCK} from '../share/model/database-mock.data';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends BaseApi<Database>{

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.databaseApiURl);
  }

  getDatabases(login: string): Observable<Database[]> {
    return super.apiGetAllWithOption('login/' + login);
  }

  getDatabase(id: number): Observable<Database> {
    return super.apiGetIdWithOption(id.toString());
  }

  /*
  addDatabase(name, serverId, userLogin, userFullName) {
    const newDatabase =
      {
        "serverId": serverId,
        "nomBd": name,
        "userLogin": userLogin,
        "userFullName": userFullName
      };

    return super.apiPost(newDatabase);
  }

  updateDatabase(database, userLogin) {
    const databaseUpdated =
      {
        "id": database.id,
        "serverId": database.serverId,
        "nomBd": database.nomBd,
        "userLogin": userLogin,
        "commentaire": database.Commentaire
      };

    return super.apiPut(databaseUpdated.id, databaseUpdated);
  }

  deleteDatabase(id) {
    return super.apiDelete(id);
  }
   */
}
