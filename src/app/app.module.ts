import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuestionComponent } from './create-quiz/question/question.component';
import { QuestionTrueFalseComponent } from './create-quiz/question/question-true-false/question-true-false.component';
import { QuestionMultipleChoiceComponent } from './create-quiz/question/question-multiple-choice/question-multiple-choice.component';
import { QuestionBogStandardComponent } from './create-quiz/question/question-bog-standard/question-bog-standard.component';
import { RoundComponent } from './create-quiz/edit-quiz/round/round.component';
import { QuestionsService } from './shared/questions.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { QuizContainerComponent } from './play-quiz/quiz-container/quiz-container.component';
import { PlayQuestionComponent } from './play-quiz/quiz-container/play-question/play-question.component';
import { AnswerService } from './shared/answer.service';
import { DisplayAnswersComponent } from './play-quiz/display-answers/display-answers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuizService } from './shared/quiz.service';
import { AddNewQuizComponent } from './create-quiz/add-new-quiz/add-new-quiz.component';

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
    AddNewQuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    QuestionsService,AnswerService,QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
