import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboaredComponent } from './shared/components/dashboared/dashboared.component';
import { StudentFormComponent } from './shared/components/student-form/student-form.component';
import { StudentTableComponent } from './shared/components/student-table/student-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { materialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPostDeleteComponent } from './shared/components/confirm-post-delete/confirm-post-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboaredComponent,
    StudentFormComponent,
    StudentTableComponent,
    ConfirmPostDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
