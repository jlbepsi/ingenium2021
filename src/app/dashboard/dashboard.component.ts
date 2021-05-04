import {Component, OnInit} from '@angular/core';

import {faDatabase, faNetworkWired, faUserGraduate} from '@fortawesome/free-solid-svg-icons';
import {DatabaseService} from '../service/database.service';
import {AuthenticationService} from '../security/authentication.service';
import {Profile} from '../share/model/profile';
import {WebStorageService} from '../service/web-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  iconDatabase = faDatabase;
  iconWebStorage = faNetworkWired;
  iconSuiviBTS = faUserGraduate;
  isLoadingDatabases = true;
  isLoadingWebStorage = true;
  errorMessage = '';
  infoDatabases = '-';
  infoWebStorage = '-';
  isBts = false;

  private profile: Profile;

  constructor(
    private databasesService: DatabaseService,
    private webStorageService: WebStorageService,
    private router: Router
  ) {
    this.profile = AuthenticationService.getProfile();
    this.isBts = this.profile.bts;
  }

  ngOnInit(): void {
    // Info base de données
    this.databasesService.getDatabases(this.profile.sub).subscribe(
      data => {
        this.isLoadingDatabases = false;
        this.infoDatabases = data.length.toString();
      },
      error => {
        this.isLoadingDatabases = false;
        this.errorMessage = 'Impossible de charger les informations des bases de données !';
      }
    );

    // Info Web Storage
    this.webStorageService.getStorage(this.profile.sub).subscribe(
      data => {
        this.isLoadingWebStorage = false;
        this.infoWebStorage = 'Actif';
      },
      error => {
        this.isLoadingWebStorage = false;
        this.infoWebStorage = 'Aucun accès';
        this.errorMessage = 'Impossible de charger les informations des bases de données !';
      }
    );
  }

  redirectTo(name: string): void {
    switch (name) {
      case 'database':
        this.router.navigate(['/database/list']);
        break;
      case 'webstorage':
        this.router.navigate(['/webstorage']);
        break;
      case 'suivibts':
        // External link
        window.open('https://newsuivippe.montpellier.epsi.fr', '_blank');
        break;
    }
  }
}
