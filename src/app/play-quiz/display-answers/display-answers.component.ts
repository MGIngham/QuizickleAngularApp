import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/shared/services/answer.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { Answer } from 'src/app/shared/models/answer.model';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionsWithAnswers } from 'src/app/shared/models/questions-with-answers.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-answers',
  templateUrl: './display-answers.component.html',
  styleUrls: ['./display-answers.component.css']
})
export class DisplayAnswersComponent implements OnInit {

  //Observables
  questions$: Observable<Question[]>;

  answer: Answer;
  question: Question;
  questions: Question[] = [];
  answers: Answer[] = [];
  questionAndAnswerArray: QuestionsWithAnswers[];

  points: number = 0;


  constructor(private answerService: AnswerService, 
            private questionService: QuestionsService) { }


 
  ngOnInit(){

    this.questions$ = this.questionService.getQuestionsByQuizId(this.questionService.quizId);

    this.questions$
    .subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.answers = this.answerService.answers;
        this.displayAnswersAndQuestions();   
        //Commit test 
        //Commit
      }
    );
  }

  displayAnswersAndQuestions(){
    let aArray = this.answers;
    let q: Question;
    let a: Answer;
    let points: number = 0;
    let qAndA: QuestionsWithAnswers;
    let qAndAarray: QuestionsWithAnswers[] = [];
    this.questions.forEach(
      function(question){
        aArray.forEach(
          function(answer){
          if(question.questionNumber === answer.questionId){
            q = question;
            a = answer;

            qAndA = new QuestionsWithAnswers(q,a)
            qAndAarray.push(qAndA);
            points += answer.point;
          }
        });
      }
    );

    this.points = points;
    this.questionAndAnswerArray = qAndAarray;

  }
  
}
