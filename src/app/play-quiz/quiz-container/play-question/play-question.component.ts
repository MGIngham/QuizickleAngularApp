import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { Question } from 'src/app/shared/models/question.model';
import { Round } from 'src/app/shared/models/round.model';
import { AnswerService } from 'src/app/shared/services/answer.service';
import { Answer } from 'src/app/shared/models/answer.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { RoundService } from 'src/app/shared/services/round.service';

@Component({
  selector: 'app-play-question',
  templateUrl: './play-question.component.html',
  styleUrls: ['./play-question.component.css']
})
export class PlayQuestionComponent {

  questionsByQuizId$: Observable<Question[]>;
  roundsByQuizId$: Observable<Round[]>;

  question: Question;

  quizId: number;
  questionsArray: Question[];
  answersArray: Answer[];
  rounds: Round[];
  answer: Answer;
  questionText: string;
  currentQuestionId: number = 0;
  currentQuestion: Question;
  isTrueOrFalse: boolean;
  playerId: number = 1;
  selectedAnswerId: number;
  maxNumberOfQuestion : number;
  questionsArrayLength: number;
  @ViewChild("answerText") answerString: ElementRef;

  constructor(private questionService: QuestionsService,
    private answerService: AnswerService,
    private roundService: RoundService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.quizId = +this.route.snapshot.params['id'];
    this.route.params
    .subscribe(
      (params: Params) => {
        this.quizId = +params.id;
      }
    );

    //let questionsArrayLength;
    this.questionsByQuizId$ = this.questionService.getQuestionsByQuizId(this.quizId);
    this.roundsByQuizId$ = this.roundService.getRoundsByQuizId(this.quizId);


    this.questionsByQuizId$
    .subscribe(
      (questions: Question[]) => {
        this.questionsArray = questions;
        this.questionsArrayLength = this.questionsArray.length;
        this.maxNumberOfQuestion = this.questionsArrayLength + 1;
        this.question = this.questionsArray[this.currentQuestionId];
      }
    );

    this.roundsByQuizId$
    .subscribe(
      (rounds: Round[]) => {
        this.rounds = rounds;
      }
    )

    this.answerService.answersReferenceArray
    .subscribe(
      (answers: Answer[]) => {
        this.answersArray = answers;
      }
    );

  }

  moveToNextQuestion(){
    this.currentQuestionId = this.questionService.getNextQuestion();
    this.question = this.questionsArray[this.currentQuestionId];
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
