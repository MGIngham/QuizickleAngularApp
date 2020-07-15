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

    questions: Question[];
    enablePlayButton: boolean = true;
    showNewQuestionComponent: boolean;

    constructor(private questionService: QuestionsService, private quizService: QuizService){}

    ngOnInit(){

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

    expandQuestionsForRound(show: Round){
        show.showQuestions != show.showQuestions;;
    }

    addNewRound(){
        this.questionService.addRound();
    }


}