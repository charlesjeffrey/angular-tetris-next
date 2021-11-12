import { TasksService } from './services/tasks.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './common/app-material.module';
import { TasksCardListComponent } from './tasks-card-list/tasks-card-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WeatherComponent } from './weather/weather.component';
import { ConvertUnixTimePipe } from './pipes/convert-unix-time.pipe';
import { ConvertDegreesToDirectionPipe } from './pipes/convert-degrees-to-direction.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksCardListComponent,
    MessagesComponent,
    TaskDialogComponent,
    WeatherComponent,
    ConvertUnixTimePipe,
    ConvertDegreesToDirectionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ TasksService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
