import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpruntsManagementRoutingModule } from './emprunts-management-routing.module';
import {AppMaterialModule} from '../app-material.module';
import { EmpruntAddComponent } from './emprunt-add/emprunt-add.component';
import { EmpruntListComponent } from './emprunt-list/emprunt-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EmpruntAddComponent,
    EmpruntListComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    EmpruntsManagementRoutingModule,
  ]
})
export class EmpruntsManagementModule { }
