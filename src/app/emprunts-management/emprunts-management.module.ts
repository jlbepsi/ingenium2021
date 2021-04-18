import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpruntsManagementRoutingModule } from './emprunts-management-routing.module';
import {AppMaterialModule} from '../app-material.module';
import { EmpruntAddComponent } from './emprunt-add/emprunt-add.component';
import { EmpruntListComponent } from './emprunt-list/emprunt-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ShareModule} from '../share/share.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FontAwesomeModule,
    ShareModule,
    EmpruntsManagementRoutingModule,
  ],
  exports: [
    EmpruntAddComponent,
    EmpruntListComponent,
  ],
  declarations: [
    EmpruntAddComponent,
    EmpruntListComponent,
  ],
})
export class EmpruntsManagementModule { }
