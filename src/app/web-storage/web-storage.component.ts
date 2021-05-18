import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../security/authentication.service';
import {WebStorageService} from '../service/web-storage.service';
import {WebStorage} from '../share/model/WebStorage';

@Component({
  selector: 'app-web-storage',
  templateUrl: './web-storage.component.html',
  styleUrls: ['./web-storage.component.scss']
})
export class WebStorageComponent implements OnInit {
  url = 'https://web.montpellier.epsi.fr/~';
  login = '...';
  errorMessage = '';
  webstorage: WebStorage;
  isLoading = false;

  constructor(
    private webStorageService: WebStorageService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.login = AuthenticationService.getProfile().sub;
    this.url += this.login;

    this.webStorageService.getStorage(this.login).subscribe(
      data => {
        this.webstorage = data;
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Impossible de charger les informations !';
        this.isLoading = false;
      }
    );
  }

}
