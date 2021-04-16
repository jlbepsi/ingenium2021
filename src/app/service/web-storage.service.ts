import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import BaseApi from './base_api';
import {Observable} from 'rxjs';
import {WebStorage} from '../share/model/WebStorage';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService extends BaseApi<WebStorage>{

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.webStorageApiUrl);
  }

  getStorage(login: string): Observable<WebStorage> {
    return super.apiGetId(login);
  }
}
