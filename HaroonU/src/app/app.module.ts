import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { DashboardComponent } from './components/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { LoginComponent } from './components/login/login.component';
import { UserrolesComponent } from './components/userroles/userroles.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ng6-toastr-notifications';
import { CreatepasswordComponent } from './createpassword/createpassword.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { UserformComponent } from './components/userform/userform.component';
import { UserTreeComponent } from './components/user-tree/user-tree.component';
import { RecaptchaModule } from 'ng-recaptcha';

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
    UserTreeComponent
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
    MatPasswordStrengthModule,
    ToastrModule.forRoot(),
    RecaptchaModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
