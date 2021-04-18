import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavbarComponent} from './navbar/navbar.component';
import {AlertComponent} from './alert/alert.component';
import {AppMaterialModule} from '../app-material.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogConfirmationComponent} from './dialog-confirmation/dialog-confirmation.component';
import {SizeReadablePipe} from './size-readable.pipe';
import {RouterModule} from '@angular/router';
import {PasswordFormComponent} from './password-form/password-form.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FontAwesomeModule,
  ],
  exports: [
    NavbarComponent,
    AlertComponent,
    DialogConfirmationComponent,
    PasswordFormComponent,
    SizeReadablePipe,
  ],
  declarations: [
    NavbarComponent,
    AlertComponent,
    DialogConfirmationComponent,
    PasswordFormComponent,
    SizeReadablePipe,
  ],
})
export class ShareModule { }
