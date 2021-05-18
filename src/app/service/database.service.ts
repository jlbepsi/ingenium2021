import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

import {Database, DatabaseApiModel} from '../share/model/database';

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

  addDatabase(newDatabase: DatabaseApiModel): Observable<Database> {
    return super.apiPost(newDatabase);
  }

  updateDatabase(databaseUpdated: DatabaseApiModel): Observable<object> {
    return super.apiPut(databaseUpdated.Id.toString(), databaseUpdated);
  }

  deleteDatabase(id: number): Observable<Database> {
    return super.apiDelete(id.toString());
  }
}
