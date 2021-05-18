import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}


@Component({
  selector: 'app-dialog-information',
  templateUrl: './dialog-information.component.html',
  styleUrls: ['./dialog-information.component.scss']
})
export class DialogInformationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
