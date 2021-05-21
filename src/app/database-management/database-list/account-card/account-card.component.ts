import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatabaseAccount, DatabaseAccountApiModel} from '../../../share/model/database-account';
import {DatabaseServer} from '../../../share/model/database-server';
import {DialogServerAccessComponent} from '../dialog-server-access/dialog-server-access.component';
import {DialogModifyPasswordComponent} from '../../dialog-modify-password/dialog-modify-password.component';
import {DialogAddAccountComponent} from '../dialog-add-account/dialog-add-account.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogContributor} from '../../database-edit/dialog-contributor/dialog-contributor.component';
import {DialogConfirmationComponent} from '../../../share/dialog-confirmation/dialog-confirmation.component';
import {DialogInformationComponent} from '../../../share/dialog-information/dialog-information.component';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() account: DatabaseAccount;
  @Output() addAccount = new EventEmitter<DatabaseAccountApiModel>();
  @Output() modifyPasswordAccount = new EventEmitter<DatabaseAccountApiModel>();
  @Output() deleteAccount = new EventEmitter<DatabaseAccountApiModel>();

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
        // console.log('update password with ' + newPassword);
        const newAccount: DatabaseAccountApiModel = {
          serverId: this.account.server.id,
          userLogin: '',
          password: newPassword
        };
        this.modifyPasswordAccount.emit(newAccount);
      }
    });
  }

  openDialogAddAccount(server: DatabaseServer): void {
    const dialogRef = this.dialog.open(DialogAddAccountComponent, {
      data: {
        serverSelected: server
      }
    });

    dialogRef.afterClosed().subscribe( (password: string) => {
      // console.log('password=', password);
      if (password !== undefined) {
        const newAccount: DatabaseAccountApiModel = {
          serverId: this.account.server.id,
          userLogin: '',
          password
        };
        this.addAccount.emit(newAccount);
      }
    });
  }

  openDialogRemoveAccount(account: DatabaseAccount): void {
    if (account.nbDatabases === 0) {
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: {
          title: 'Suppression du compte',
          buttonTitle: 'SUPPRIMER',
          message: `Supprimer le compte <b>'${account.sqlLogin}'</b> du serveur '${account.server.name}' ?`,
          buttonStyle: 'danger',
          buttonIconName: 'delete_forever'
        }
      });

      dialogRef.afterClosed().subscribe((doDelete: boolean) => {
        if (doDelete) {
          const accountDeleted: DatabaseAccountApiModel = {
            serverId: account.server.id,
            userLogin: account.userLogin,
            password: ''
          };
          this.deleteAccount.emit(accountDeleted);
        }
      });
    } else {
      this.dialog.open(DialogInformationComponent, {
        data: {
          title: 'Suppression du compte',
          message: `Vous devez supprimer les bases de données du serveur '${account.server.name}' pour pouvoir supprimer le compte`,
        },
        width: '420px'
      });
    }
  }
}
