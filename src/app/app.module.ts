import { TasksService } from './services/tasks.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { TasksCardListComponent } from './tasks-card-list/tasks-card-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksCardListComponent,
    MessagesComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ TasksService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
