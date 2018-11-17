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
import { SanctionruleComponent } from './components/sanctionrule/sanctionrule.component';
import { ApprovingauthorityComponent } from './components/approvingauthority/approvingauthority.component';
import { TrainingrequirementsComponent } from './components/trainingrequirements/trainingrequirements.component';
import { YearcalendarComponent } from './components/yearcalendar/yearcalendar.component';

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
    path: 'sanctionrule',
    component: SanctionruleComponent
  },
  {
    path: 'approvingauthority',
    component: ApprovingauthorityComponent
  },
  {
    path: 'trainingreq',
    component: TrainingrequirementsComponent
  },
  {
    path: 'yearcalendar',
    component: YearcalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
