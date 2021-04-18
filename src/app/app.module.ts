import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppMaterialModule } from './app-material.module';
import { GithubComponent } from './softwares/github/github.component';
import { IntellijComponent } from './softwares/intellij/intellij.component';
import { MicrosoftComponent } from './softwares/microsoft/microsoft.component';
import { SuivippeComponent } from './suivippe/suivippe.component';
import { SupportComponent } from './resources/support/support.component';
import { PrintersComponent } from './resources/printers/printers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VmwareComponent } from './softwares/vmware/vmware.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WebStorageComponent } from './web-storage/web-storage.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './security/login/login.component';
import {LoaderComponent} from './share/loader/loader.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from './share/share.module';
import {DatabaseManagementModule} from './database-management/database-management.module';
import {EmpruntsManagementModule} from './emprunts-management/emprunts-management.module';

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ShareModule,
    DatabaseManagementModule,
    EmpruntsManagementModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GithubComponent,
    IntellijComponent,
    MicrosoftComponent,
    SuivippeComponent,
    SupportComponent,
    PrintersComponent,
    DashboardComponent,
    VmwareComponent,
    WebStorageComponent,
    LoginComponent,
    LoaderComponent,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr-FR'
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
