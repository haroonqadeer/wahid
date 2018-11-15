import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PostsComponent } from './components/posts/posts.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { JobprofileComponent } from './components/jobprofile/jobprofile.component';
import { PostComponent } from './components/post/post.component';
import { RecruitmentappComponent } from './components/recruitmentapp/recruitmentapp.component';
import { LeaverulesComponent } from './components/leaverules/leaverules.component';
import { PerformanceStandComponent } from './components/performance-stand/performance-stand.component';
import { PerformanceEvaComponent } from './components/performance-eva/performance-eva.component';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent
  },
  {
    path: 'recruitmentApproval',
    component: RecruitmentappComponent
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
