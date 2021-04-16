import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmpruntAddComponent} from './emprunt-add/emprunt-add.component';
import {EmpruntListComponent} from './emprunt-list/emprunt-list.component';

const routes: Routes = [
  { path: 'emprunt/list', component: EmpruntListComponent },
  { path: 'emprunt/add', component: EmpruntAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpruntsManagementRoutingModule { }
