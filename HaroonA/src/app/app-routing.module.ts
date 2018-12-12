import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionaireComponent
  },
  {
    path: 'questionaire',
    component: QuestionaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
