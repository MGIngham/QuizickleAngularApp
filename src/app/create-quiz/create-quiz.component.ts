import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Question } from '../shared/models/question.model'
import { QuizService } from '../shared/services/quiz.service';
import { RoundService } from '../shared/services/round.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.css']
})

export class CreateQuizComponent implements OnInit {

    questions: Question[];
    enablePlayButton: boolean = true;
    showNewQuestionComponent: boolean;
    backgroundColour: string;
    quizId: number;

    constructor(private questionService: QuestionsService, 
        private quizService: QuizService,
        private roundService: RoundService,
        private router: Router){}

    ngOnInit(){

        this.questionService.questionsReferenceArray
        .subscribe(
            (questions: Question[]) => {
                this.questions = questions;
            }
        );

        this.roundService.showQuestionComponent.emit(false);    

        this.roundService.showQuestionComponent
        .subscribe(
            (show: boolean) => {
                this.showNewQuestionComponent = show;
            }
        )

        this.backgroundColour = this.quizService.backgroundColour;
        this.quizId = this.questionService.quizId;
    }

    ngOnChange(){
        this.enablePlayButton = (this.questions.length > 0) ? true : false;
    }

    addNewRound(){
        let q = this.questionService.quizId;
        this.roundService.addRound(q);
    }

    navigateToQuiz(){
        let quizId: number = this.questionService.quizId;
        this.router.navigate(['play-quiz',quizId]);
    }


}