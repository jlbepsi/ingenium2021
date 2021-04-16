import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Database} from '../../share/model/database';
import {DatabaseServer} from '../../share/model/database-server';
import {DialogServerAccessComponent} from '../database-list/dialog-server-access/dialog-server-access.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DatabaseService} from '../../service/database.service';
import {DatabaseUser} from '../../share/model/database-user';
import {DialogConfirmationComponent} from '../../share/dialog-confirmation/dialog-confirmation.component';
import {DialogContributorComponent, DialogContributor} from './dialog-contributor/dialog-contributor.component';

@Component({
  selector: 'app-database-edit',
  templateUrl: './database-edit.component.html',
  styleUrls: ['./database-edit.component.scss']
})
export class DatabaseEditComponent implements OnInit {

  database: Database = null;
  // Nombre de comptes Admin de la base de données
  cptAdmins = 0;

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

  constructor(
    private databasesService: DatabaseService,
    protected route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Obtention de la base de données
    this.getDatabase();
  }


  isFormValid(): boolean {
    return (this.commentForm.controls.comment.dirty || this.commentForm.controls.comment.touched) &&
      this.commentForm.controls.comment.value !== this.database.commentaire;
  }

  onSubmitForm(): void {
    // TODO
    this.processValidateRunning = true;
    alert(this.commentForm.controls.comment.value);
    /*this.usersService.updateUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur modifié !', 'X');
      },
      error => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue dans la modification !';
        this.snackBar.open('Utilisateur non modifié !', 'X');
      }
    );*/
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
    const dialogRef = this.dialog.open(DialogContributorComponent, {
    });

    dialogRef.afterClosed().subscribe( (contributor: DialogContributor) => {
      console.log('createContributor=', contributor);
      if (contributor !== undefined) {
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

  editContributor(databaseUser: DatabaseUser): void {
    const dialogRef = this.dialog.open(DialogContributorComponent, {
      data: databaseUser
    });

    dialogRef.afterClosed().subscribe( (contributor: DialogContributor) => {
      console.log('editcontributor=', contributor);
      if (contributor !== undefined) {
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

  deleteContributor(databaseUser: DatabaseUser): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Suppression du contributeur',
        buttonTitle: 'SUPPRIMER',
        message: `Supprimer le contributeur <b>'${databaseUser.userFullName}'</b> ?`,
        buttonStyle: 'danger',
        buttonIconName: 'delete_forever'
      }
    });

    dialogRef.afterClosed().subscribe( (doDelete: boolean) => {
      if (doDelete) {
        alert('suppression contributeur=' + databaseUser.sqlLogin);
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

  private getDatabase(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.processLoadRunning = true;
    this.databasesService.getDatabase(id).subscribe(
      data => {
        if (data.commentaire === null) {
          data.commentaire = '';
        }
        // On compte le nb d'administrateur
        data.users.forEach((contributor) => {
          if (contributor.groupType === 1) {
            this.cptAdmins++;
          }
        });
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

  canUpdate(user: DatabaseUser): boolean {
    return user.canBeUpdated && (user.groupType !== 1 || this.cptAdmins > 1);
  }

  canDeleted(user: DatabaseUser): boolean {
    return user.canBeDeleted && (user.groupType !== 1 || this.cptAdmins > 1);
    // return user.canBeDeleted && !(user.groupType === 1 && this.cptAdmins <= 1);
  }
}
