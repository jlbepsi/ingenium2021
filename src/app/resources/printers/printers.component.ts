import { Component, OnInit } from '@angular/core';

import {PRINTERS} from './printers-data';
import {Printer} from './printer';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddPrinterComponent} from './dialog-add-printer/dialog-add-printer.component';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss']
})
export class PrintersComponent implements OnInit {
  printers: Printer[] = PRINTERS;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showInstallation(printer: Printer): void {
    this.dialog.open(DialogAddPrinterComponent, {
      /*width: '450px',*/
      data: printer
    });
  }
}
