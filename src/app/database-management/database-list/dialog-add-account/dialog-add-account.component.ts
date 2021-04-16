import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatabaseServer} from '../../../share/model/database-server';

export interface DialogData {
  serverSelected: DatabaseServer;
}

@Component({
  selector: 'app-dialog-add-account',
  templateUrl: './dialog-add-account.component.html',
  styleUrls: ['./dialog-add-account.component.scss']
})
export class DialogAddAccountComponent {
  password = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  isFormValid(): boolean {
    return this.password.length > 0;
  }

  submit(): string {
    return this.password;
  }

  updatePassword(newPassword: string): void {
    this.password = newPassword;
  }
}
