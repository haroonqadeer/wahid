import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import { HttpModule } from '@angular/http';
import { MatRadioModule } from '@angular/material/radio';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobprofileComponent } from './components/jobprofile/jobprofile.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { PostComponent } from './components/post/post.component';
import { RecruitmentappComponent } from './components/recruitmentapp/recruitmentapp.component';


import { TestComponent } from './components/test/test.component';
import { EmpolyeeprofileComponent } from './components/empolyeeprofile/empolyeeprofile.component';
import { SkillstandardComponent } from './components/skillstandard/skillstandard.component';
import { TrainingrequirementsComponent } from './components/trainingrequirements/trainingrequirements.component';
import { YearcalendarComponent } from './components/yearcalendar/yearcalendar.component';
import { LoginComponent } from './components/login/login.component';

import { LeaverulesComponent } from './components/leaverules/leaverules.component';
import { PerformanceStandComponent } from './components/performance-stand/performance-stand.component';
import { PerformanceEvaComponent } from './components/performance-eva/performance-eva.component';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { HRDashboardComponent } from './components/hrdashboard/hrdashboard.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { ToastrModule } from 'ng6-toastr-notifications';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { JobComponent } from './components/job/job.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OnlineJobProfileComponent } from './components/online-job-profile/online-job-profile.component';
import { OnlineTestComponent } from './components/online-test/online-test.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    JobprofileComponent,
    PostComponent,
    RecruitmentComponent,
    RecruitmentappComponent,
    TestComponent,
    EmpolyeeprofileComponent,
    SkillstandardComponent,
    TrainingrequirementsComponent,
    YearcalendarComponent,
    LeaverulesComponent,
    PerformanceStandComponent,
    PerformanceEvaComponent,
    LeavetypeComponent,
    ErpBottomSheetComponent,
    HRDashboardComponent,
    IntroPageComponent,
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
    ChartModule,
    ReactiveFormsModule,
    PNPrimeModule,
    HttpModule,
    HttpClientModule,
    MatRadioModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({}),
    OrderModule,
    NgxPaginationModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],
})
export class AppModule { }
