import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {DatabaseUser} from '../share/model/database-user';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService extends BaseApi<DatabaseUser> {

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.contributorApiURl);
  }

  addContributor(contributor: DatabaseUser): Observable<DatabaseUser> {
    return super.apiPost(contributor);
  }

  modifyContributor(contributor: DatabaseUser): Observable<object> {
    return super.apiPut(contributor.sqlLogin, contributor);
  }

  deleteContributor(loginsql: string, contributor: DatabaseUser): Observable<DatabaseUser> {
    return super.apiDeleteWithURL(loginsql, contributor);
  }
}
