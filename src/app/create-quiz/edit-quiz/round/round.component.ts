import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/shared/questions.service';
import { Question } from 'src/app/shared/question.model';
import { Round } from 'src/app/shared/round.model';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  questions: Question[];

  showNewQuestionComponent: boolean = false;
  addRoundButtonClicked: boolean = false;
  round: number;
  roundIdForQuestion: number;
  roundId: number;
  rounds: Round[];
  //showAddRounds = false;

  @Output() emitShowQuestionComponent = new EventEmitter<boolean>();

  @ViewChild('roundNameRef') roundNameInput: ElementRef;

  //Maybe
  currentRoundNum: number;
  thisRoundId: number;

  constructor(private questionService: QuestionsService) { }

  ngOnInit() {

    this.questionService.questionSaved
    .subscribe(
        () => {
            this.showNewQuestionComponent = false;
        }
    );

    this.questionService.roundsReferenceArray
    .subscribe(
        (rounds: Round[]) => {
            this.rounds = rounds;
        }
    );

    this.questionService.questionsReferenceArray
    .subscribe(
      (questions: Question[]) => {
        this.questions = questions
      }
    )

    this.questionService.addRound();

  }

  updateRoundName(id: number){

    let name = this.roundNameInput.nativeElement.value;

    this.questionService.nameRound(id, name);

  }

  showQuestionComponent(){

    let show = this.showNewQuestionComponent = true;
    this.emitShowQuestionComponent.emit(show);
    
  }


}
