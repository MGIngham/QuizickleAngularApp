import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuestionComponent } from './create-quiz/question/question.component';
import { QuestionTrueFalseComponent } from './create-quiz/question/question-true-false/question-true-false.component';
import { QuestionMultipleChoiceComponent } from './create-quiz/question/question-multiple-choice/question-multiple-choice.component';
import { QuestionBogStandardComponent } from './create-quiz/question/question-bog-standard/question-bog-standard.component';
import { RoundComponent } from './create-quiz/edit-quiz/round/round.component';
import { QuizContainerComponent } from './play-quiz/quiz-container/quiz-container.component';
import { PlayQuestionComponent } from './play-quiz/quiz-container/play-question/play-question.component';
import { DisplayAnswersComponent } from './play-quiz/display-answers/display-answers.component';
import { AddNewQuizComponent } from './create-quiz/add-new-quiz/add-new-quiz.component';

import { QuestionsService } from './shared/services/questions.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { AnswerService } from './shared/services/answer.service';
import { QuizService } from './shared/services/quiz.service';
import { HomeComponent } from './home/home.component';
import { ColourPickerComponent } from './create-quiz/colour-picker/colour-picker.component';
import { RoundService } from './shared/services/round.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpService } from './shared/services/http.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateQuizComponent,
    QuestionComponent,
    QuestionTrueFalseComponent,
    QuestionMultipleChoiceComponent,
    QuestionBogStandardComponent,
    RoundComponent,
    DropdownDirective,
    QuizContainerComponent,
    PlayQuestionComponent,
    DisplayAnswersComponent,
    AddNewQuizComponent,
    HomeComponent,
    ColourPickerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    QuestionsService,
    AnswerService,
    QuizService,
    RoundService,
    HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
