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
    super(httpClient, environment.databaseAccountApiURl);
  }

  getDatabases(login: string): Observable<Database[]> {
    /** TODO : Faire AccountService avec l'API */
    return of(DATABASE_MOCK);
    // return super.apiGetAllWithOption('login/' + login);
  }

  getDatabase(id: number): Observable<Database> {
    return of(DATABASE_MOCK.find(a => a.id === id));
    // return super.apiGetId(id);
  }
}
