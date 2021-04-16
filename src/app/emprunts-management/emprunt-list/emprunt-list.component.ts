import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {EMPRUNTS} from '../model/emprunts-mock-data';
import {Emprunt} from '../model/emprunt';

@Component({
  selector: 'app-emprunt-list',
  templateUrl: './emprunt-list.component.html',
  styleUrls: ['./emprunt-list.component.scss']
})
export class EmpruntListComponent implements OnInit {


  displayedColumns: string[] = ['status', 'type', 'marque', 'modele', 'description', 'datedebut', 'datefin', 'action'];
  dataSource = new MatTableDataSource<Emprunt>([]);


  private snackTypeClass = {
    success: 'snackbarColorSuccess',
    danger: 'snackbarColorDanger',
    info: 'snackbarColorInfo',
    warning: 'snackbarColorWarning'
  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  openSnackBar(message: string, type: string): void {
    this._snackBar.open(message, '', {
      panelClass: [type]
    });
  }

  ngOnInit(): void {
    this.getEmprunts();
  }

  private getEmprunts(): void {
    this.dataSource.data = EMPRUNTS;
  }

  supprimerEmprunt(id: string): void {
    // TODO : Plus tard
  }

  ajouterEmprunt(): void {
    this.router.navigate(['/emprunt/add']).then( (e) => {
      if (! e) {
        console.log('Navigation has failed!');
      }
    });
  }

  details(id: string): void {
    // TODO : Plus tard
  }

}
