import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Profile} from '../model/profile';
import {PROFILE_MOCK} from '../model/profile-mock.data';

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

  constructor() { }

  static isLoggedIn(): boolean {
    // Checks if there is a saved token and it's still valid
    const token = AuthenticationService.getToken();
    return !!token && !AuthenticationService.isTokenExpired(token);
  }

  static isTokenExpired(token: string): boolean {
    /*
    // Le vrai code
    try {
      const decoded = jwt_decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }*/

    // La simulation
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
    /** TODO : Faire le profil */
    return PROFILE_MOCK;
  }

  loginWithRole(username, password, role): Observable<AuthenticationResponse> {
    /*
    // Le vrai code
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
    */

    // La simulation
    const response: AuthenticationResponse = {status: true, message: 'HTTP 200', token: 'atoken'};
    AuthenticationService.setToken('token');
    return of(response);
  }

}
