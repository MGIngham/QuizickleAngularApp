import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewQuizComponent } from './create-quiz/add-new-quiz/add-new-quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizContainerComponent } from './play-quiz/quiz-container/quiz-container.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'new-quiz', component: AddNewQuizComponent},
    {path: 'create-quiz', component: CreateQuizComponent},
    {path: 'play-quiz', component: QuizContainerComponent},
    {path: 'play-quiz/:id', component: QuizContainerComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found'}
  ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}