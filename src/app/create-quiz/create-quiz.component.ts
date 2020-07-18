import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Round } from '../shared/models/round.model';
import { Question } from '../shared/models/question.model';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizService } from '../shared/services/quiz.service';
import { Quiz } from '../shared/models/quiz.model';
import { RoundService } from '../shared/services/round.service';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent implements OnInit {

    questions: Question[];
    enablePlayButton: boolean = true;
    showNewQuestionComponent: boolean;

    constructor(private questionService: QuestionsService, 
        private quizService: QuizService,
        private roundService: RoundService){}

    ngOnInit(){

        this.questionService.questionsReferenceArray
        .subscribe(
            (questions: Question[]) => {
                this.questions = questions;
            }
        );

        this.roundService.showQuestionComponent
        .subscribe(
            (show: boolean) => {
                this.showNewQuestionComponent = show;
            }
        )

    }

    ngOnChange(){
        this.enablePlayButton = (this.questions.length > 0) ? true : false;
    }

    expandQuestionsForRound(show: Round){
        show.showQuestions != show.showQuestions;;
    }

    addNewRound(){
        this.roundService.addRound();
    }


}