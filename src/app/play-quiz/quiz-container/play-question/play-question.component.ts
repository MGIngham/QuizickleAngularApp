import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { Question } from 'src/app/shared/models/question.model';
import { Round } from 'src/app/shared/models/round.model';
import { AnswerService } from 'src/app/shared/services/answer.service';
import { Answer } from 'src/app/shared/models/answer.model';
import { Observable } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styleUrls: ['./play-question.component.css']
})
export class PlayQuestionComponent implements AfterViewInit {

  questionsByQuizId$: Observable<Question[]>;

  questionsArray: Question[];
  answersArray: Answer[];
  rounds: Round[];
  answer: Answer;
  questionText: string;
  currentQuestionId: number = 1;
  currentQuestion: Question;
  isTrueOrFalse: boolean;
  playerId: number = 1;
  selectedAnswerId: number;
  maxNumberOfQuestion : number;
  questionsArrayLength: number;
  @ViewChild("answerText") answerString: ElementRef;


  testNum: number;

  constructor(private questionService: QuestionsService,
    private answerService: AnswerService) { }


  ngAfterViewInit() {

    //let questionsArrayLength;
    this.questionsByQuizId$ = this.questionService.getQuestionsByQuizId(this.questionService.quizId);

    this.questionsByQuizId$
    .subscribe(
      (questions: Question[]) => {
        this.questionsArray = questions;
        this.questionsArrayLength = this.questionsArray.length;
        this.maxNumberOfQuestion = this.questionsArrayLength + 1;
      }
    );

    this.answerService.answersReferenceArray
    .subscribe(
      (answers: Answer[]) => {
        this.answersArray = answers;
      }
    );

  }

  moveToNextQuestion(){
    this.currentQuestionId = this.questionService.getNextQuestion();
  }

  addAnswer(roundId: number, 
    questionId: number,
    answerIndex: number,
    typeID: number,
    correctAnswerIndex: number,
    answerString?: string){

    let answerText: string;
    let point: number = 0;

    if(typeID == 3){
      answerText = this.answerString.nativeElement.value;
      if(answerText.toUpperCase() === answerString.toUpperCase()){
        point = 1;
      }
    } else {
      answerText = "";
      if(correctAnswerIndex === answerIndex){
        point = 1;
      }
    }

    this.answer = new Answer(
      this.playerId,
      roundId,
      questionId,
      point,
      answerIndex,
      answerText
    )

    this.answerService.addAnswer(this.answer);
  }

}
