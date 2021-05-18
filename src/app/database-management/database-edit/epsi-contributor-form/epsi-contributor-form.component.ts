import {EventEmitter, Component, OnInit, Output, Input} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';

import {CLASSES} from '../../../share/model/classes';
import {UserLdap} from '../../../share/model/userldap';
import {UsersService} from '../../../service/users.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from '../../../service/account.service';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-epsi-contributor-form',
  templateUrl: './epsi-contributor-form.component.html',
  styleUrls: ['./epsi-contributor-form.component.scss']
})
export class EpsiContributorFormComponent implements OnInit {
  classes: string[];
  users: UserLdap[];
  loginServerAccounts: string[];
  processLoadRunning = false;
  usersSelectDisabled = true;

  @Input() serverId: number;
  @Output() loginSelected = new EventEmitter<string>();

  constructor(
    private accountService: AccountService,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.classes = CLASSES;

    this.processLoadRunning = true;
    this.accountService.getLoginServerAccounts(this.serverId).subscribe(
      data => {
        this.loginServerAccounts = data;
        this.processLoadRunning = false;
      },
      error => {
        this.processLoadRunning = false;
        this.snackBar.open('Serveur non trouvé !', 'X');
      }
    );
  }

  onClasseChange(selectChange: MatSelectChange): void {
    this.processLoadRunning = true;
    this.usersService.getUsersOfClass(selectChange.value).subscribe(
      users => {
        this.updateUsersList(users);
        this.users = users;
        this.processLoadRunning = false;
      },
      error => {
        this.processLoadRunning = false;
        this.snackBar.open('Utilisateurs non trouvé !', 'X');
      }
    );
  }

  onMembreChange(selectChange: MatSelectChange): void {
    this.loginSelected.emit(`${selectChange.value}-${(selectChange.source.selected as MatOption).viewValue}`);
  }

  private updateUsersList(users: UserLdap[]): void {
    this.usersSelectDisabled = true;

    // On met l'attribut disable à vrai pour tout le monde
    users.forEach( user => user.uidisabled = true);
    // Pour chaque utilisateur du serveur, on met l'attribut active à vrai
    this.loginServerAccounts.forEach( (login => {
      const user = users.find( u => u.login === login);
      if (user) {
        user.uidisabled = ! user.active;
      }
    }));

    this.usersSelectDisabled = false;
  }
}
