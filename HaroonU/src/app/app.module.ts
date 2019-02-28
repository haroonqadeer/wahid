import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { LoginComponent } from './components/login/login.component';
import { UserrolesComponent } from './components/userroles/userroles.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ng6-toastr-notifications';

import { UserIdleModule } from 'angular-user-idle';
import { CreatepasswordComponent } from './createpassword/createpassword.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { UserformComponent } from './components/userform/userform.component';
import { UserTreeComponent } from './components/user-tree/user-tree.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { HttpModule } from '@angular/http';
import { TryMenuPageComponent } from './components/try-menu-page/try-menu-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    DashboardComponent,
    UserprofileComponent,
    UserrolesComponent,
    LoginComponent,
    UserrolesComponent,
    UserprofileComponent,
    ErpBottomSheetComponent,
    CreatepasswordComponent,
    UserformComponent,
    UserTreeComponent,
    TryMenuPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    ChartModule,
    BrowserAnimationsModule,
    FormsModule,
    PNPrimeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatPasswordStrengthModule,
    ToastrModule.forRoot(),
    RecaptchaModule.forRoot(),
    // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
    // Default values: `idle` is 60 (1 minutes), `timeout` is 30 (0.5 minutes) 
    // and `ping` is 15 0.25 minutes).
<<<<<<< HEAD

    UserIdleModule.forRoot({ idle: 120, timeout: 120, ping: 15 }),
=======
    UserIdleModule.forRoot({ idle: 60, timeout: 60, ping: 15 }),
>>>>>>> f5501c3464fedf0e84b9e0598d87ebdf0e5ec2a5
    NgxPaginationModule,
    OrderModule,
    HttpModule
  ],

  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
