import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HelpComponent} from "../layout/help/help.component";
import {UserInfoComponent} from "../layout/user-info/user-info.component";
import {AskLeaveComponent} from "../layout/ask-leave/ask-leave.component";


const routes: Routes = [
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'help',  component: HelpComponent },
  { path: 'info',  component: UserInfoComponent },
  { path: 'leave',  component: AskLeaveComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
