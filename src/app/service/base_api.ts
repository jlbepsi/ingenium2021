import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../security/authentication.service';

export default class BaseApi<T> {

  protected static getHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + AuthenticationService.getToken()
    });
  }

  constructor(protected httpClient: HttpClient, private domain: string) {
  }

  apiGetAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.domain);
  }

  apiGetAllWithOption(idOrUrl: string): Observable<T[]> {
    return this.httpClient.get<T[]>(
      this.getUrl(idOrUrl), {
        headers: BaseApi.getHttpOptions()
      }
    );
  }

  apiGetId(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.domain}/${id}`);
  }

  apiGetIdWithOption(id: string): Observable<T> {
    return this.httpClient.get<T>(
      this.getUrl(id), {
        headers: BaseApi.getHttpOptions()
      }
    );
  }

  apiPost(data: any): Observable<T> {
    return this.apiPostWithURL(null, data);
  }
  apiPostWithURL(idOrUrl: string, data: any): Observable<T> {
    return this.httpClient.post<T>(
      this.getUrl(idOrUrl), data, {
        headers: BaseApi.getHttpOptions()
      }
    );
  }
  apiPut(idOrUrl: string, data: any): Observable<T> {
    return this.httpClient.put<T>(
      this.getUrl(idOrUrl), data, {
        headers: BaseApi.getHttpOptions()
      }
    );
  }
  apiDelete(id: string): Observable<T> {
    return this.httpClient.delete<T>(
      this.getUrl(id), {
        headers: BaseApi.getHttpOptions()
      }
    );
  }
  /*apiDeleteWithURL(idOrUrl: string, data: any): Observable<T>  {
    return this.apiMethodWithData(idOrUrl, 'DELETE', data);
  }

  private apiMethodWithData(idOrUrl: string, method: string, data: any): Observable<T> {
    data = (data == null ? '' : JSON.stringify(data));
    return this.httpClient.request<T>(method,
      this.getUrl(idOrUrl), {
        body: data,
        headers: BaseApi.getHttpOptions()
      });
  }*/

  protected getUrl(idOrUrl: string): string {
    // return this.domain + (idOrUrl == null ? '' : '/' + idOrUrl);
    return `${this.domain}/${idOrUrl}`;
  }
}
