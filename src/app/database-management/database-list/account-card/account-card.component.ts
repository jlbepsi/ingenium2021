import {Component, Input, OnInit} from '@angular/core';
import {DatabaseAccount} from '../../../share/model/database-account';
import {DatabaseServer} from '../../../share/model/database-server';
import {DialogServerAccessComponent} from '../dialog-server-access/dialog-server-access.component';
import {DialogModifyPasswordComponent} from '../../dialog-modify-password/dialog-modify-password.component';
import {DialogAddAccountComponent} from '../dialog-add-account/dialog-add-account.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() account: DatabaseAccount;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogServerAccess(server: DatabaseServer): void {
    this.dialog.open(DialogServerAccessComponent, {
      width: '650px',
      data: {
        name: server.name,
        url: server.nomDns,
        dnsExt: server.nomDns,
        portExt: server.portExterne,
        dnsLocal: server.nomDnslocal,
        portlocal: server.portLocal,
        serverCode: server.code,
      }
    });
  }

  openDialogModifyPassword(account: DatabaseAccount): void {
    const dialogRef = this.dialog.open(DialogModifyPasswordComponent, {
      // width: '320px',
      data: {
        loginsql: account.sqlLogin,
        serverSelected: account.server
      }
    });

    dialogRef.afterClosed().subscribe( (newPassword: string) => {
      if (newPassword !== undefined && newPassword.length > 0) {
        console.log('update password with ' + newPassword);
        /*this.usersService.changePassword(login, newPassword).subscribe(
          data => {
            this.showSnackbar('Modification effectuée !', 'X');
          },
          error => {
            this.errorMessage = 'Impossible de modifier le mot de passe';
            this.showSnackbar('Modification impossible !', 'X');
          }
        );*/
      }
    });
  }

  openDialogAddAccount(server: DatabaseServer): void {
    const dialogRef = this.dialog.open(DialogAddAccountComponent, {
      // height: '470px',
      data: {
        serverSelected: server
      }
    });

    dialogRef.afterClosed().subscribe( (password: string) => {
      console.log('password=', password);
      if (password !== undefined) {
        /*this.usersService.changePassword(login, newPassword).subscribe(
          data => {
            this.showSnackbar('Modification effectuée !', 'X');
          },
          error => {
            this.errorMessage = 'Impossible de modifier le mot de passe';
            this.showSnackbar('Modification impossible !', 'X');
          }
        );*/
      }
    });
  }
}
