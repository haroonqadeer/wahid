import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { PNPrimeModule } from './shared/pnprime/pnprime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipe-filters/pipe-search';
import { ChartModule } from 'angular-highcharts';
import {HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobprofileComponent } from './components/jobprofile/jobprofile.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { PostComponent } from './components/post/post.component';
import { RecruitmentappComponent } from './components/recruitmentapp/recruitmentapp.component';
import { LeaverulesComponent } from './components/leaverules/leaverules.component';
import { PerformanceStandComponent } from './components/performance-stand/performance-stand.component';
import { PerformanceEvaComponent } from './components/performance-eva/performance-eva.component';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    JobprofileComponent,
    PostComponent,
    RecruitmentComponent,
    RecruitmentappComponent,
    LeaverulesComponent,
    PerformanceStandComponent,
    PerformanceEvaComponent,
    LeavetypeComponent

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
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
