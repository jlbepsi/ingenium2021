import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatabaseAccount} from '../../../share/model/database-account';
import {DatabaseServer} from '../../../share/model/database-server';
import {specialCharactersValidator} from '../../../share/specialCharactersValidator';


export interface DialogData {
  accounts: DatabaseAccount[];
}
export interface DialogNewDatabaseResult {
  server: DatabaseServer;
  databasename: string;
}
@Component({
  selector: 'app-dialog-new-database',
  templateUrl: './dialog-new-database.component.html',
  styleUrls: ['./dialog-new-database.component.scss']
})
export class DialogNewDatabaseComponent implements OnInit {

  serversList: DatabaseServer[] = [];
  serverSelected: DatabaseServer = null;
  databaseForm = this.fb.group({
      name: ['', [Validators.required,  Validators.minLength(6), specialCharactersValidator]],
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.serversList = data.accounts.map(account => account.server);
  }

  ngOnInit(): void {
    this.databaseForm.controls.name.markAsTouched({onlySelf: true});
  }

  changeServer(server: DatabaseServer): void {
    this.serverSelected = server;
  }

  submit(): DialogNewDatabaseResult {
    return {
      server: this.serverSelected,
      databasename: this.databaseForm.get('name').value
    };
  }

  isFormValid(): boolean {
    return this.databaseForm.valid
      && this.serverSelected !== null;
  }

  errorHandlingDB = () => {
    return this.serverSelected === null;
  }

  errorHandling = (error: string) => {
    return this.databaseForm.get('name').hasError(error);
  }
}
