import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobComponent } from './components/job/job.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OnlineJobProfileComponent } from './components/online-job-profile/online-job-profile.component';
import { OnlineTestComponent } from './components/online-test/online-test.component'
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    //component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'onlineTest',
    component: OnlineTestComponent
  },
  {
    path: 'signUp',
    component: SignInComponent
  },
  {
    path: 'onlineJobProfile',
    component: OnlineJobProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
