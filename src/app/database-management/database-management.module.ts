import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseManagementRoutingModule } from './database-management-routing.module';
import { DatabasePermissionComponent } from './database-list/database-permission/database-permission.component';
import {AppMaterialModule} from '../app-material.module';
import { AccountCardComponent } from './database-list/account-card/account-card.component';
import {DatabaseListComponent} from './database-list/database-list.component';
import {DialogServerAccessComponent} from './database-list/dialog-server-access/dialog-server-access.component';
import {DialogModifyPasswordComponent} from './dialog-modify-password/dialog-modify-password.component';
import {DialogAddAccountComponent} from './database-list/dialog-add-account/dialog-add-account.component';
import {DialogNewDatabaseComponent} from './database-list/dialog-new-database/dialog-new-database.component';
import {DatabaseEditComponent} from './database-edit/database-edit.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {ServerSelectionListComponent} from './server-selection-list/server-selection-list.component';
import { DialogContributorComponent } from './database-edit/dialog-contributor/dialog-contributor.component';
import {PermissionSelectionListComponent} from './permission-selection-list/permission-selection-list.component';
import { EpsiContributorFormComponent } from './database-edit/epsi-contributor-form/epsi-contributor-form.component';
import { OtherContributorFormComponent } from './database-edit/other-contributor-form/other-contributor-form.component';
import { UpdateContributorFormComponent } from './database-edit/update-contributor-form/update-contributor-form.component';
import {ShareModule} from '../share/share.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    ShareModule,
    DatabaseManagementRoutingModule,
  ],
  declarations: [
    AccountCardComponent,
    ServerSelectionListComponent,
    PermissionSelectionListComponent,
    EpsiContributorFormComponent,
    OtherContributorFormComponent,
    UpdateContributorFormComponent,
    DatabaseListComponent,
    DatabaseEditComponent,
    DatabasePermissionComponent,
    DialogServerAccessComponent,
    DialogAddAccountComponent,
    DialogModifyPasswordComponent,
    DialogNewDatabaseComponent,
    DialogContributorComponent,
  ],
  exports: [
    DialogModifyPasswordComponent,
    AccountCardComponent,
    ServerSelectionListComponent,
    PermissionSelectionListComponent,
    EpsiContributorFormComponent,
    OtherContributorFormComponent,
    UpdateContributorFormComponent,
    DatabaseListComponent,
    DatabaseEditComponent,
    DatabasePermissionComponent,
    DialogServerAccessComponent,
    DialogAddAccountComponent,
    DialogNewDatabaseComponent,
    DialogContributorComponent,
  ]
})
export class DatabaseManagementModule { }
