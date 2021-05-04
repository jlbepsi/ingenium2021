import {Component, Inject, OnInit} from '@angular/core';
import {PermissionType} from '../../Permission';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatabaseUser} from '../../../share/model/database-user';

export interface DialogContributor {
  login: string;        // SSI Utilisateur EPSI
  userFullName?: string; // SSI Utilisateur EPSI
  sqlLogin: string;     // SSI Autre utilisateur
  password: string;
  permissionId: number; // Id de la permission
}
enum TabIndex { EpsiContributor, OtherContributor}

@Component({
  selector: 'app-dialog-new-contributor',
  templateUrl: './dialog-contributor.component.html',
  styleUrls: ['./dialog-contributor.component.scss']
})
export class DialogContributorComponent implements OnInit {

  contributor: DialogContributor = {login: '', userFullName: '', sqlLogin: '', password: '', permissionId: 0};
  tabSelected = TabIndex.EpsiContributor;
  modeEdition = false;
  userIsOtherContributor: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DatabaseUser
  ) {
    if (data !== null) {
      // Mode édition activé
      this.modeEdition = true;
      this.contributor.login = data.userLogin;
      if (data.userFullName === null) {
        // Autre contributeur
        this.userIsOtherContributor = true;
        this.tabSelected =  TabIndex.OtherContributor;
        this.contributor.sqlLogin = data.sqlLogin;
        this.contributor.userFullName = null;
      } else {
        // Epsi contributeur
        this.userIsOtherContributor = false;
        this.tabSelected =  TabIndex.EpsiContributor;
        this.contributor.sqlLogin = null;
        this.contributor.userFullName = data.userFullName;
      }
      // Aucun password initial
      this.contributor.permissionId = data.groupType;
    }
  }

  ngOnInit(): void {
  }

  isFormValid(): boolean {
    return ! (this.errorHandlingEpsiContributor() || this.errorHandlingOtherContributor() || this.errorHandlingPermission()) ;
  }

  submit(): DialogContributor {
    return this.contributor;
  }

  selectedTabChange(tabChangeEvent: MatTabChangeEvent): void {
    this.tabSelected = tabChangeEvent.index;
  }

  onLoginSelect(selected: string): void {
    // Utilisateur EPSI
    this.contributor.login = selected;
    this.contributor.sqlLogin = null;
    this.contributor.password = null;
  }

  onUserSelect(contributorResult: DialogContributor): void {
    // Autre Utilisateur
    this.contributor.login = null;
    this.contributor.sqlLogin = contributorResult.sqlLogin;
    this.contributor.password = contributorResult.password;
  }

  selectPermission(selected: PermissionType): void {
    this.contributor.permissionId = selected.id;
  }

  errorHandlingEpsiContributor = () => {
    return this.tabSelected === TabIndex.EpsiContributor && this.contributor.login === null;
  }

  errorHandlingOtherContributor = () => {
    return this.tabSelected === TabIndex.OtherContributor && this.contributor.sqlLogin == null;
  }

  errorHandlingPermission = () => {
    return this.contributor.permissionId === 0;
  }
}
