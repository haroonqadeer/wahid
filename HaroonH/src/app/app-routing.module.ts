import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PostsComponent } from './components/posts/posts.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { JobprofileComponent } from './components/jobprofile/jobprofile.component';
import { PostComponent } from './components/post/post.component';
import { RecruitmentappComponent } from './components/recruitmentapp/recruitmentapp.component';

import { TestComponent } from './components/test/test.component';
import { EmpolyeeprofileComponent } from './components/empolyeeprofile/empolyeeprofile.component';
import { SkillstandardComponent } from './components/skillstandard/skillstandard.component';
import { TrainingrequirementsComponent } from './components/trainingrequirements/trainingrequirements.component';
import { YearcalendarComponent } from './components/yearcalendar/yearcalendar.component';

import { LeaverulesComponent } from './components/leaverules/leaverules.component';
import { PerformanceStandComponent } from './components/performance-stand/performance-stand.component';
import { PerformanceEvaComponent } from './components/performance-eva/performance-eva.component';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';
import { HRDashboardComponent } from './components/hrdashboard/hrdashboard.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { JobComponent } from './components/job/job.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OnlineJobProfileComponent } from './components/online-job-profile/online-job-profile.component';

const routes: Routes = [
  {
    path: '',
    component: IntroPageComponent,
    //component: LoginComponent,
  },{
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: HRDashboardComponent
  },
  {
    path: 'signUp',
    component: SignInComponent
  },
  {
    path: 'onlineJobProfile',
    component: OnlineJobProfileComponent
  },
  {
    path: 'recruitmentApproval',
    component: RecruitmentappComponent
  },
  {
    path: 'onlineJob',
    component: JobComponent
  },
  {
    path: 'job',
    component: JobprofileComponent
  },
  {
    path: 'recruitment',
    component: RecruitmentComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'employee',
    component: EmpolyeeprofileComponent
  },
  {
    path: 'skillstandard',
    component: SkillstandardComponent
  },
  {
    path: 'trainingreq',
    component: TrainingrequirementsComponent
  },
  {
    path: 'yearcalendar',
    component: YearcalendarComponent
  },
  {
    path: 'leaveRules',
    component: LeaverulesComponent
  },
  {
    path: 'leaveType',
    component: LeavetypeComponent
  },
  {
    path: 'performanceStandard',
    component: PerformanceStandComponent
  },
  {
    path: 'performanceEvaluation',
    component: PerformanceEvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
