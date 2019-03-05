import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClarityModule } from '@clr/angular';
import { DataUrlPipe } from './data-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DataUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
