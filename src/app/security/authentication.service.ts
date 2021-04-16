import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Profile} from '../share/model/profile';
import {PROFILE_MOCK} from '../share/model/profile-mock.data';


interface AuthenticationResponse {
  status: boolean;
  token: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl = '/';

  private authenticationUrl = '';

  constructor(private httpClient: HttpClient) {
    this.authenticationUrl = environment.authenticationApiURl;
  }

  static isLoggedIn(): boolean {
    // Checks if there is a saved token and it's still valid
    const token = AuthenticationService.getToken(); // Getting token from localstorage
    return !!token && !AuthenticationService.isTokenExpired(token); // handwaiving here
  }

  static isTokenExpired(token: string): boolean {
    /* TODO : Ajout de JWT
    try {
      const decoded = jwt_decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
    */
    return false;
  }

  static setToken(idToken: string): void {
    // Saves user token to sessionStorage
    sessionStorage.setItem('id_token', idToken);
  }

  static getToken(): string {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem('id_token');
  }

  static logout(): void {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem('id_token');
  }

  static getProfile(): Profile {
    /* TODO : Ajout de JWT pour le profil
    // Using jwt-decode npm package to decode the token
    return jwt_decode(AuthenticationService.getToken());
    */
    return PROFILE_MOCK;
  }


  /*login(login: string, password: string): Observable<object> {
    return this.loginWithRole(login, password, null);
  }*/

  loginWithRole(username, password, role): Observable<object> {
    /* TODO : Faire l'authentification
    const url = `${this.authenticationUrl}/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.request<AuthenticationResponse>('POST', url, {
      body: {
        username,
        password,
        role
      },
      headers: httpOptions.headers
    }).pipe(
      tap((data: AuthenticationResponse) => AuthenticationService.setToken(data.token)) // Setting the token in sessionStorage)
    );
  }
  */
    const response: AuthenticationResponse = {
      message: 'OK', status: true, token: '1234567890ABCDEF'
    };
    return of(response);
  }
}
