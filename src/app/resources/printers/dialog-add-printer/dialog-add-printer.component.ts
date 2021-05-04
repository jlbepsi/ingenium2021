import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../../../share/dialog-confirmation/dialog-confirmation.component';
import {Printer} from '../printer';

@Component({
  selector: 'app-dialog-add-printer',
  templateUrl: './dialog-add-printer.component.html',
})
export class DialogAddPrinterComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Printer
  ) { }

  ngOnInit(): void {
  }

  getOS(): string {
    const plateform = window.navigator.platform;
    if (plateform.indexOf('Windows') >= 0) {
      return 'windows';
    } else if (plateform.indexOf('Mac') >= 0) {
      return  'mac';
    }
    return 'linux';
  }
}
