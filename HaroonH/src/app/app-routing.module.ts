import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PostsComponent } from './components/posts/posts.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { JobprofileComponent } from './components/jobprofile/jobprofile.component';
import { PostComponent } from './components/post/post.component';
import { RecruitmentappComponent } from './components/recruitmentapp/recruitmentapp.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
