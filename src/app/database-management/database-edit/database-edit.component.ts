import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Database, DatabaseApiModel} from '../../share/model/database';
import {DatabaseServer} from '../../share/model/database-server';
import {DialogServerAccessComponent} from '../database-list/dialog-server-access/dialog-server-access.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DatabaseService} from '../../service/database.service';
import {DatabaseUser} from '../../share/model/database-user';
import {DialogConfirmationComponent} from '../../share/dialog-confirmation/dialog-confirmation.component';
import {DialogContributorComponent, DialogContributor, DialogDataContributor} from './dialog-contributor/dialog-contributor.component';
import {AuthenticationService} from '../../security/authentication.service';
import {SnackbarTpe} from '../../share/model/snackbar-type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContributorsService} from '../../service/contributors.service';
import {Profile} from '../../share/model/profile';

@Component({
  selector: 'app-database-edit',
  templateUrl: './database-edit.component.html',
  styleUrls: ['./database-edit.component.scss']
})
export class DatabaseEditComponent implements OnInit {

  constructor(
    private databasesService: DatabaseService,
    private contributorsService: ContributorsService,
    protected route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.profile = AuthenticationService.getProfile();
  }

  database: Database = null;

  get nbAdmins(): number {
    // Nombre de compte Administrateur dans la base de donneés
    let nbAdmins = 0;
    this.dataSource.data.forEach((contributor) => {
      if (contributor.groupType === 1) {
        nbAdmins++;
      }
    });
    return nbAdmins;
  }

  processLoadRunning = false;
  processValidateRunning = false;
  errorMessage = '';

  commentForm = this.fb.group({
    comment: ['']
  });
  /********** MATERIAL **********/
  displayedColumns: string[] = ['userFullName', 'sqlLogin', 'permission', 'action'];
  dataSource = new MatTableDataSource<DatabaseUser>( []);
  @ViewChild(MatTable, { static: false, read: ElementRef }) table: ElementRef;

  private profile: Profile;

  private static compareUsers(u1: DatabaseUser, u2: DatabaseUser): number {
    if (u1.groupType === u2.groupType) {
      return (u2.userFullName === null ? u2.sqlLogin.toLowerCase() : u2.userFullName).localeCompare(
        (u1.userFullName === null ? u1.sqlLogin.toLowerCase() : u1.userFullName), 'fr', { sensitivity: 'base' }
      );
    }
    return u1.groupType - u2.groupType;
  }

  ngOnInit(): void {
    // Obtention de la base de données
    this.getDatabase();
  }


  isFormValid(): boolean {
    return (this.commentForm.controls.comment.dirty || this.commentForm.controls.comment.touched) &&
      this.commentForm.controls.comment.value !== this.database.commentaire;
  }

  onSubmitForm(): void {
    this.processValidateRunning = true;
    const databaseModel: DatabaseApiModel = {
      Id: this.database.id,
      NomBD: this.database.nomBd,
      ServerId: this.database.server.id,
      UserLogin: this.profile.sub,
      UserFullName: this.profile.nom + ' ' + this.profile.prenom,
      Commentaire: this.commentForm.get('comment').value
    };
    this.databasesService.updateDatabase(databaseModel).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.showSnackbar('Commentaire modifié !', SnackbarTpe.success);
        // Mise à jour du commantaire pour la méthode isFormValid
        this.database.commentaire = databaseModel.Commentaire;
      },
      error => {
        this.processValidateRunning = false;
        this.errorMessage = 'Impossible de modifier le commentaire';
        this.showSnackbar('Modification impossible !', SnackbarTpe.danger);
      }
    );
  }

  goToList(): void {
    this.router.navigate(['/database/list']);
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

  createContributor(): void {
    const dialogData: DialogDataContributor = {
      serverId: this.database.server.id,
      user: null
    };
    const dialogRef = this.dialog.open(DialogContributorComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (contributor: DialogContributor) => {
      // console.log('createContributor=', contributor);
      if (contributor !== undefined) {
        const newContributor: DatabaseUser = {
          dbId: this.database.id,
          userLogin: contributor.sqlLogin,
          sqlLogin: contributor.sqlLogin,
          password: contributor.password,
          userFullName: contributor.userFullName,
          groupType: contributor.permissionId,
          addedByUserLogin: this.profile.sub,
          canBeDeleted: true,
          canBeUpdated: true
        };
        this.contributorsService.addContributor(newContributor).subscribe(
          data => {
            // Ajout
            this.database.users.push(data);
            // Tri par type puis par nom
            this.database.users.sort((dgu1, dgu2) => DatabaseEditComponent.compareUsers(dgu1, dgu2));
            // Mise à jour dans la table
            this.dataSource.data = this.database.users;

            this.showSnackbar('Contributeur ajouté !', SnackbarTpe.success);
          },
          error => {
            this.errorMessage = 'Impossible d\'ajouter le contributeur';
            this.showSnackbar('Ajout impossible !', SnackbarTpe.danger);
          }
        );
      }
    });
  }

  editContributor(databaseUser: DatabaseUser): void {
    const dialogData: DialogDataContributor = {
      serverId: this.database.server.id,
      user: databaseUser
    };
    const dialogRef = this.dialog.open(DialogContributorComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (contributor: DialogContributor) => {
      if (contributor !== undefined) {
        const databaseUserUpdate: DatabaseUser = {
          dbId: databaseUser.dbId,
          sqlLogin: databaseUser.sqlLogin,
          userLogin: databaseUser.userLogin,
          userFullName: databaseUser.userFullName,
          groupType: contributor.permissionId,
          password: null,
          addedByUserLogin: databaseUser.addedByUserLogin,
          canBeDeleted: databaseUser.canBeDeleted,
          canBeUpdated: databaseUser.canBeUpdated
        };
        this.contributorsService.modifyContributor(databaseUserUpdate).subscribe(
          data => {
            // Modification
            const contributorUpdated = this.database.users.find(c => c.sqlLogin === contributor.sqlLogin);
            contributorUpdated.groupType = contributor.permissionId;
            // Tri par type puis par nom
            this.database.users.sort((dgu1, dgu2) => DatabaseEditComponent.compareUsers(dgu1, dgu2));
            // Mise à jour dans la table
            this.dataSource.data = this.database.users;

            this.showSnackbar('Contributeur modifié !', SnackbarTpe.success);
          },
          error => {
            this.errorMessage = 'Impossible de modififer le contributeur';
            this.showSnackbar('Modification impossible !', SnackbarTpe.danger);
          }
        );
      }
    });
  }

  deleteContributor(databaseUser: DatabaseUser): void {
    let contributorName = databaseUser.userLogin;
    if (databaseUser.userFullName !== null && databaseUser.userFullName.length > 0) {
      contributorName += ' (' + databaseUser.userFullName + ')';
    }
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Suppression du contributeur',
        buttonTitle: 'SUPPRIMER',
        message: `Supprimer le contributeur <b>'${contributorName}'</b> ?`,
        buttonStyle: 'danger',
        buttonIconName: 'delete_forever'
      }
    });

    dialogRef.afterClosed().subscribe( (doDelete: boolean) => {
      if (doDelete) {
        this.contributorsService.deleteContributor(databaseUser.sqlLogin, databaseUser).subscribe(
          data => {
            this.database.users = this.database.users.filter(user => user.sqlLogin !== databaseUser.sqlLogin);
            // Mise à jour dans la table
            this.dataSource.data = this.database.users;
            this.showSnackbar('Contributeur supprimé !', SnackbarTpe.success);
          },
          error => {
            this.errorMessage = 'Impossible de supprimer le contributeur';
            this.showSnackbar('Suppression impossible !', SnackbarTpe.danger);
          }
        );
      }
    });
  }

  canUpdate(user: DatabaseUser): boolean {
    return user.canBeUpdated && (user.groupType !== 1 || this.nbAdmins > 1);
  }

  canDeleted(user: DatabaseUser): boolean {
    return user.canBeDeleted && (user.groupType !== 1 || this.nbAdmins > 1);
  }

  private getDatabase(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.processLoadRunning = true;
    this.databasesService.getDatabase(id).subscribe(
      data => {
        if (data.commentaire === null) {
          data.commentaire = '';
        }
        // Tri par type puis par nom
        data.users.sort((dgu1, dgu2) => DatabaseEditComponent.compareUsers(dgu1, dgu2));
        this.database = data;
        this.dataSource.data = data.users;
        this.commentForm.controls.comment.setValue(this.database.commentaire);
        this.processLoadRunning = false;
      },
      error => {
        this.processLoadRunning = false;
        this.errorMessage = 'Impossible de charger la base de données !';
      }
    );
  }

  private showSnackbar(message: string, type: string): void {
    this.snackBar.open(message, 'Fermer', {
      panelClass: [type]
    });
  }
}
