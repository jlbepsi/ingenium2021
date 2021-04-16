import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  buttonTitle: string;
  message: string;
  buttonStyle: string;
  buttonIconName: string;
}

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
