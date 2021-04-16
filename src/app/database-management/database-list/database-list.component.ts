import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DatabaseAccount} from '../../share/model/database-account';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PROFILE_MOCK} from '../../share/model/profile-mock.data';
import {Database} from '../../share/model/database';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DatabaseService} from '../../service/database.service';
import {AccountService} from '../../service/account.service';
import {Profile} from '../../share/model/profile';
import {DialogNewDatabaseComponent, DialogNewDatabaseResult} from './dialog-new-database/dialog-new-database.component';
import {DialogConfirmationComponent} from '../../share/dialog-confirmation/dialog-confirmation.component';
import {Router} from '@angular/router';


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
    /** TODO : Obtenir le profil connecté */
    this.profile = PROFILE_MOCK;
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
        // this.fillContributors(data);
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
      console.log('database=', database);
      if (database !== undefined) {
        console.log(database.databasename, database.server.id !== null && database.server.canAddDatabase);
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
        alert('suppression BD=' + database.nomBd);
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

  private accountAnalysis(): void {
    if (this.dataSource.data.length > 0 && this.accounts.length > 0) {
      this.accounts.forEach( (account) => {
        const dbFound = this.dataSource.data.filter(db => db.serverId === account.server.id);
        account.nbDatabases = (dbFound === null ? 0 : dbFound.length);
      });
    }
  }

  private showSnackbar(message: string, type: string): void {
    this.snackBar.open(message, '', {
      panelClass: [type]
    });
  }
}

