import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HelpComponent } from './layout/help/help.component';
import { UserInfoComponent } from './layout/user-info/user-info.component';
import { AskLeaveComponent } from './layout/ask-leave/ask-leave.component';
import { AskLeaveDraftComponent } from './layout/ask-leave-draft/ask-leave-draft.component';
import { AskLeaveDoneComponent } from './layout/ask-leave-done/ask-leave-done.component';
import { AskLeaveFormComponent } from './layout/ask-leave-form/ask-leave-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HelpComponent,
    UserInfoComponent,
    AskLeaveComponent,
    AskLeaveDraftComponent,
    AskLeaveDoneComponent,
    AskLeaveFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
