import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatabaseServer} from '../model/database-server';

export interface DialogData {
  nomComplet: string;
  loginsql: string;
  serverSelected: DatabaseServer;
}

@Component({
  selector: 'app-dialog-modify-password',
  templateUrl: './dialog-modify-password.component.html',
  styleUrls: ['./dialog-modify-password.component.scss']
})
export class DialogModifyPasswordComponent {
  password = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  isFormValid(): boolean {
    return this.password.length > 0;
  }

  updatePassword(newPassword: string): void {
    this.password = newPassword;
  }
}
