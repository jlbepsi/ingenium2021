import { Injectable } from '@angular/core';
import BaseApi from './base_api';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Contributor} from '../share/model/Contributor';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService extends BaseApi<Contributor> {

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.contributorApiURl);
  }

  /*
  addContributor(newContributor) {
    return super.apiPost(newContributor);
  }

  modifyContributor(contributor) {
    return super.apiPut(contributor.sqlLogin, contributor);
  }

  deleteContributor(loginsql, contributor) {
    return super.apiDeleteWithURL(loginsql, contributor)
  }
   */
}
