import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { Question } from 'src/app/shared/models/question.model';
import { Round } from 'src/app/shared/models/round.model';
import { RoundService } from 'src/app/shared/services/round.service';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit, OnDestroy {

  questions: Question[];
  private subscription: Subscription;
  
  @Input() quizId: number;
  help: string = "What the fuck!";
  showNewQuestionComponent: boolean = false;
  addRoundButtonClicked: boolean = false;
  showQuestions: boolean = false;
  round: number;
  roundIdForQuestion: number;
  roundId: number;
  rounds: Round[];
  //showAddRounds = false;

  @Output() emitShowQuestionComponent = new EventEmitter<boolean>();

  roundNameInput: string[] = [];

  //Maybe
  currentRoundNum: number;
  thisRoundId: number;

  constructor(private questionService: QuestionsService,
    private roundService: RoundService,
    private quizService: QuizService) {}

  ngOnInit() {

    this.questionService.questionSaved
    .subscribe(
        () => {
            this.showNewQuestionComponent = false;
        }
    );

    this.roundService.roundsReferenceArray
    .subscribe(
        (rounds: Round[]) => {
            this.rounds = rounds;
        }
    );

    this.subscription = this.questionService.questionsReferenceArray
    .subscribe(
      (questions: Question[]) => {
        this.questions = questions
      }
    )

    this.quizService.quizIdReference
    .subscribe(
      (quizId: number) => {
        this.quizId = quizId;
        this.roundService.addRound(quizId);
      }
    )
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  updateRoundName(id: number){

    let name = this.roundNameInput[id];
    let roundId = id;

    this.roundService.nameRound(roundId, name);

  }

  showQuestionComponent(){
    this.roundService.showQuestionComponent.emit(true);    
  }

  updateCurrentRoundId(id: number){
    let currentRoundId = id;
    this.questionService.currentRoundId = currentRoundId;
  }


}
