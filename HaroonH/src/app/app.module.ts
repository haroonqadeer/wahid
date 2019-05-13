import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import {HttpModule} from '@angular/http';
import {MatRadioModule} from '@angular/material/radio';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobprofileComponent } from './components/jobprofile/jobprofile.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { PostComponent } from './components/post/post.component';
import { RecruitmentappComponent } from './components/recruitmentapp/recruitmentapp.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { TestComponent } from './components/test/test.component';
import { EmpolyeeprofileComponent } from './components/empolyeeprofile/empolyeeprofile.component';
import { SkillstandardComponent } from './components/skillstandard/skillstandard.component';
import { TrainingrequirementsComponent } from './components/trainingrequirements/trainingrequirements.component';
import { YearcalendarComponent } from './components/yearcalendar/yearcalendar.component';

import { LeaverulesComponent } from './components/leaverules/leaverules.component';
import { PerformanceStandComponent } from './components/performance-stand/performance-stand.component';
import { PerformanceEvaComponent } from './components/performance-eva/performance-eva.component';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';
import { ErpBottomSheetComponent } from './components/erp-bottom-sheet/erp-bottom-sheet.component';
import { HRDashboardComponent } from './components/hrdashboard/hrdashboard.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';


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
    IntroPageComponent
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
    MatRadioModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErpBottomSheetComponent],  
})
export class AppModule { }
