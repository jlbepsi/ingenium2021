import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  name: string;
  url: string;
  dnsExt: string;
  portExt: string;
  dnsLocal: string;
  portlocal: string;
  serverCode: string;
}

@Component({
  selector: 'app-dialog-server-access',
  templateUrl: './dialog-server-access.component.html'
})
export class DialogServerAccessComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  getAdditionnalInfo(): string {
    switch (this.data.serverCode.toLowerCase()) {
      case 'oracle':
        return '<li>SID: <code>bdaolap</code></li>';
      case 'sqlserver':
      case 'mysql':
      default:
        return '';
    }
  }

  getServerDescription(): string {
    let serverDescription = '';
    switch (this.data.serverCode.toLowerCase()) {
      case 'sqlserver':
        serverDescription = 'L\'accès à SQL Server se fait depuis <a href="https://docs.microsoft.com/fr-fr/sql/ssms/download-sql-server-management-studio-ssms" target="_blank" rel="noopener noreferrer">SQL Server Management Studio</a>.<br />';
        break;
      case 'oracle':
        serverDescription = 'L\'accès à Oracle se fait depuis <a href="https://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html" target="_blank" rel="noopener noreferrer">SQL Developer</a>.<br />';
        break;
      case 'mysql':
        const url = 'https://' + this.data.dnsExt;
        serverDescription = `L'accès à MySQL se fait depuis un navigateur web à l'URL <a href="${url}" target="_blank" rel="noopener">${url}</a>`;
        break;
    }
    return serverDescription;
  }
}
