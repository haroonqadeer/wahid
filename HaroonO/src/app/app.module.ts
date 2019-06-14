import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OrderModule } from 'ngx-order-pipe';

import { JobComponent } from './components/job/job.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OnlineJobProfileComponent } from './components/online-job-profile/online-job-profile.component';
import { OnlineTestComponent } from './components/online-test/online-test.component'
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    JobComponent,
    LoginComponent,
    SignInComponent,
    OnlineJobProfileComponent,
    OnlineTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PNPrimeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    OrderModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
