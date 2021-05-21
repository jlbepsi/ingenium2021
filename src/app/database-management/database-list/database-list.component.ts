import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DatabaseAccount, DatabaseAccountApiModel} from '../../share/model/database-account';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Database, DatabaseApiModel} from '../../share/model/database';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DatabaseService} from '../../service/database.service';
import {AccountService} from '../../service/account.service';
import {Profile} from '../../share/model/profile';
import {DialogNewDatabaseComponent, DialogNewDatabaseResult} from './dialog-new-database/dialog-new-database.component';
import {DialogConfirmationComponent} from '../../share/dialog-confirmation/dialog-confirmation.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../security/authentication.service';
import {SnackbarTpe} from '../../share/model/snackbar-type';


@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.scss']
})
export class DatabaseListComponent implements OnInit {
  isLoadingAccounts = false;
  accounts: DatabaseAccount[] = [];
  isLoadingDatabases = false;
  errorMessage = '';

  /********** MATERIAL **********/
  displayedColumns: string[] = ['icone', 'nomDns', 'nomBd', 'commentaire', 'contributors', 'action'];
  dataSource = new MatTableDataSource<Database>([]);
  @ViewChild(MatTable, { static: false, read: ElementRef }) table: ElementRef;

  private profile: Profile;

  constructor(
    private accountsService: AccountService,
    private databasesService: DatabaseService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.profile = AuthenticationService.getProfile();
  }

  ngOnInit(): void {
    this.isLoadingAccounts = true;
    this.accountsService.getAccounts(this.profile.sub).subscribe(
      data => {
        this.accounts = data;
        this.accountAnalysis();
        this.isLoadingAccounts = false;
      },
      error => {
        this.isLoadingAccounts = false;
        this.errorMessage = 'Impossible de charger les comptes !';
      }
    );

    this.isLoadingDatabases = true;
    this.databasesService.getDatabases(this.profile.sub).subscribe(
      data => {
        this.dataSource.data = data;
        this.accountAnalysis();
        this.isLoadingDatabases = false;
      },
      error => {
        this.isLoadingDatabases = false;
        this.errorMessage = 'Impossible de charger les bases de données !';
      }
    );
  }

  edit(id: number): void {
    this.router.navigate(['/database', id]).then( (e) => {
      if (! e) {
        console.log('Navigation has failed!');
      }
    });
  }

  createDatabase(): void {
    const dialogRef = this.dialog.open(DialogNewDatabaseComponent, {
      width: '450px',
      data: {
        accounts: this.accounts.filter( acc => acc.sqlLogin !== null)
      }
    });

    dialogRef.afterClosed().subscribe( (database: DialogNewDatabaseResult) => {
      // console.log('database=', database);
      if (database !== undefined) {
        const newDatabase: DatabaseApiModel =
          {
            Id: 0,
            ServerId: database.server.id,
            NomBD: database.databasename,
            UserLogin: this.profile.sub,
            UserFullName: this.profile.nom + ' ' + this.profile.prenom,
            Commentaire: ''
          };
        this.databasesService.addDatabase(newDatabase).subscribe(
          data => {
            this.showSnackbar('Base de données ajoutée !', SnackbarTpe.success);
            // Ajout
            const databases: Database[] = this.dataSource.data;
            databases.push(data);
            // Tri par nom
            databases.sort((db1, db2) => db1.nomBd.localeCompare(db2.nomBd));
            this.dataSource.data = databases;

            // On relance l'analyse pour les comptes SQL (voir AccountCard - nbDatabase)
            this.accountAnalysis();
          },
          error => {
            this.errorMessage = 'Impossible d\'ajouter la base de données';
            this.showSnackbar('Ajout impossible !', SnackbarTpe.danger);
          }
        );
      }
    });
  }

  delete(database: Database): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Suppression de base de données',
        buttonTitle: 'SUPPRIMER',
        message: `Supprimer la base de données <b>'${database.nomBd}'</b> du serveur '${database.server.nomDns}' ?`,
        buttonStyle: 'danger',
        buttonIconName: 'delete_forever'
      }
    });

    dialogRef.afterClosed().subscribe( (doDelete: boolean) => {
      if (doDelete) {
        // console.log('suppression BD=', database);
        this.databasesService.deleteDatabase(database.id).subscribe(
          data => {
            this.showSnackbar('Base de données supprimée !', SnackbarTpe.success);
            this.dataSource.data = this.dataSource.data.filter(db => db.id !== data.id);

            // On relance l'analyse pour les comptes SQL (voir AccountCard - nbDatabase)
            this.accountAnalysis();
          },
          error => {
            this.errorMessage = 'Impossible de supprimer la base de données';
            this.showSnackbar('Suppression impossible !', SnackbarTpe.danger);
          }
        );
      }
    });
  }

  onAddAccount(newAccount: DatabaseAccountApiModel): void {
    // On fixe l'identifiant utilisateur
    newAccount.userLogin = this.profile.sub;
    // console.log('DatabaseListComponent.onAddAccount', newAccount);
    this.accountsService.addAccount(newAccount).subscribe(
      data => {
        this.showSnackbar('Compte SQL ajouté !', SnackbarTpe.success);
        /*
         *  Les comptes SQL sont tous présents:
         *    - il faut donc le trouver
         *    - puis modifier les informations du compte
         */
        const accountFound = this.accounts.find(account => account.server.id === newAccount.serverId);
        accountFound.sqlLogin = data.sqlLogin;
        accountFound.userLogin = data.userLogin;
        accountFound.nbDatabases = 0;
      },
      error => {
        console.log('DatabaseListComponent-onAddAccount, error = ', error);
        this.errorMessage = 'Impossible d\'ajouter le compte utilisateur';
        this.showSnackbar('Ajout impossible !', SnackbarTpe.danger);
      }
    );
  }

  onModifyPasswordAccount(updatedAccount: DatabaseAccountApiModel): void {
    // On fixe l'identifiant utilisateur
    updatedAccount.userLogin = this.profile.sub;
    // console.log('DatabaseListComponent.onModifyPasswordAccount', updatedAccount);
    this.accountsService.updateAccount(updatedAccount).subscribe(
      data => {
        this.showSnackbar('Compte SQL modifié !', SnackbarTpe.success);
      },
      error => {
        this.errorMessage = 'Impossible de modifier le compte utilisateur';
        this.showSnackbar('Modification impossible !', SnackbarTpe.danger);
      }
    );
  }

  onDeleteAccount(accountDeleted: DatabaseAccountApiModel): void {
    // On fixe l'identifiant utilisateur
    accountDeleted.userLogin = this.profile.sub;
    // console.log('DatabaseListComponent.onDeleteAccount', accountDeleted);
    this.accountsService.deleteAccount(accountDeleted).subscribe(
      data => {
        this.showSnackbar('Compte SQL supprimé !', SnackbarTpe.success);
        /*
         *  Les comptes SQL sont tous présents:
         *    - il faut donc le trouver
         *    - puis modifier les informations du compte
         */
        const accountFound = this.accounts.find(account =>
          account.server.id === accountDeleted.serverId && account.userLogin === accountDeleted.userLogin);
        accountFound.sqlLogin = null;
        accountFound.nbDatabases = 0;
      },
      error => {
        this.errorMessage = 'Impossible de supprimer le compte utilisateur';
        this.showSnackbar('Suppression impossible !', SnackbarTpe.danger);
      }
    );
  }

  private accountAnalysis(): void {
    if (this.dataSource.data.length > 0) {
      if (this.accounts.length > 0) {
        this.accounts.forEach((account) => {
          const dbFound = this.dataSource.data.filter(db => db.serverId === account.server.id);
          account.nbDatabases = (dbFound === null ? 0 : dbFound.length);
        });
      }
    } else {
      this.accounts.forEach( account => account.nbDatabases = 0);
    }
  }

  private showSnackbar(message: string, type: string): void {
    this.snackBar.open(message, 'Fermer', {
      panelClass: [type]
    });
  }
}

