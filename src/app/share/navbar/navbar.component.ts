import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import {  faServer, faFileCode } from '@fortawesome/free-solid-svg-icons';
import {  faGithub, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../security/authentication.service';
import {Profile} from '../model/profile';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faMicrosoft = faMicrosoft;
  faGithub = faGithub;
  faVMware = faServer;
  faIntellij = faFileCode;
  profile: Profile;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.profile = AuthenticationService.getProfile();
  }

  logout(): void {
    AuthenticationService.logout();
    this.router.navigate(['/login']);
  }
}
