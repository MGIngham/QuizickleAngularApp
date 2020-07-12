import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
import { Round } from '../shared/round.model';
import { Question } from '../shared/question.model';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizService } from '../shared/quiz.service';
import { Quiz } from '../shared/quiz.model';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent implements OnInit {

    //TESTING VARIABLES//
    questionsTest$: Observable<Question[]>;
    //-----------------//

    addRoundButtonClicked: boolean = false;
    showNewQuestionComponent: boolean = false;
    round: number;
    roundIdForQuestion: number;
    newRound: Round;
    roundId: number;
    rounds: Round[];
    questions: Question[];
    enablePlayButton: boolean = true;
    showAddRounds = false;
    
    currentRoundNum: number;

    @ViewChild('roundNameRef') roundNameInput: ElementRef;

    constructor(private questionService: QuestionsService, private quizService: QuizService){}

    ngOnInit(){
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
                this.questions = questions;
            }
        );

    }

    ngOnChange(){
        this.enablePlayButton = (this.questions.length > 0) ? true : false;
    }



    addNewRound(){

        let name: string = this.roundNameInput.nativeElement.value;
        let id = this.questionService.roundNumber;

        this.addRoundButtonClicked = false;

        this.newRound = new Round(id,name);
    
        this.questionService.addRound(this.newRound);

    }

    updateCurrentRoundId(id: number){
        this.questionService.currentRoundId = id;
    }

    expandQuestionsForRound(show: Round){
        show.showQuestions != show.showQuestions;;
    }


}