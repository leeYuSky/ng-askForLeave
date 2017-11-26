import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HelpComponent} from "../layout/help/help.component";
import {UserInfoComponent} from "../layout/user-info/user-info.component";
import {AskLeaveComponent} from "../layout/ask-leave/ask-leave.component";
import {ReviewLeaveComponent} from "../layout/review-leave/review-leave.component";
import {LayoutComponent} from "../layout/layout.component";
import {LoginPageComponent} from "../login-page/login-page.component";
import {AskOvertimeComponent} from "../layout/ask-overtime/ask-overtime.component";


const routes: Routes = [
  {
    path: 'main',
    component : LayoutComponent,
    children : [
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'help', component: HelpComponent},
      {path: 'info', component: UserInfoComponent},
      {path: 'leave', component: AskLeaveComponent},
      {path: 'overtime', component: AskOvertimeComponent},
      {path: 'review', component: ReviewLeaveComponent},
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component : LoginPageComponent},
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
