import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MicrosoftComponent} from './softwares/microsoft/microsoft.component';
import {IntellijComponent} from './softwares/intellij/intellij.component';
import {GithubComponent} from './softwares/github/github.component';
import {VmwareComponent} from './softwares/vmware/vmware.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EmpruntListComponent} from './emprunts-management/emprunt-list/emprunt-list.component';
import {EmpruntAddComponent} from './emprunts-management/emprunt-add/emprunt-add.component';
import {WebStorageComponent} from './web-storage/web-storage.component';
import {DatabaseListComponent} from './database-management/database-list/database-list.component';
import {DatabaseEditComponent} from './database-management/database-edit/database-edit.component';
import {AuthGuard} from './security/auth-guard.guard';
import {LoginComponent} from './security/login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PrintersComponent} from './resources/printers/printers.component';
import {SupportComponent} from './resources/support/support.component';


const adminRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'emprunt/list', component: EmpruntListComponent },
      { path: 'emprunt/add', component: EmpruntAddComponent},
      { path: 'webstorage', component: WebStorageComponent},
      { path: 'database/list', component: DatabaseListComponent},
      { path: 'database/:id', component: DatabaseEditComponent},
      { path: 'software/microsoft', component: MicrosoftComponent},
      { path: 'software/intellij', component: IntellijComponent},
      { path: 'software/github', component: GithubComponent},
      { path: 'software/vmware', component: VmwareComponent},
      { path: 'resources/printers', component: PrintersComponent},
      { path: 'resources/support', component: SupportComponent},
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
/*const routes: Routes = [
  { path: 'emprunt/list', component: EmpruntListComponent },
  { path: 'emprunt/add', component: EmpruntAddComponent},
  { path: 'webstorage', component: WebStorageComponent},
  { path: 'database/list', component: DatabaseListComponent},
  { path: 'database/:id', component: DatabaseEditComponent},
  { path: 'software/microsoft', component: MicrosoftComponent},
  { path: 'software/intellij', component: IntellijComponent},
  { path: 'software/github', component: GithubComponent},
  { path: 'software/vmware', component: VmwareComponent},
  { path: '**', component: DashboardComponent}
];*/

@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
