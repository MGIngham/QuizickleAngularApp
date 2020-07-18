import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
    selector: 'app-question-multiple-choice',
    templateUrl: './question-multiple-choice.component.html',
    styleUrls: ['./question-multiple-choice.component.css']
})

export class QuestionMultipleChoiceComponent implements OnInit {

    questionTypeId: number = 1;

    question: Question;

    @ViewChild("question") questionText: ElementRef;
    @ViewChild("optOne") optionOne: ElementRef;
    @ViewChild("optTwo") optionTwo: ElementRef;
    @ViewChild("optThree") optionThree: ElementRef;
    @ViewChild("optFour") optionFour: ElementRef;

    correctAnswerIndex: number;

    constructor(private questionService: QuestionsService){}

    ngOnInit(){

    }

    isCorrectAnswer(answerIndex: number){
        this.correctAnswerIndex = answerIndex;
    }

    addQuestion(){
        let id = this.questionService.questionId;
        let quizNumber = this.questionService.quizId;
        let round = this.questionService.currentRoundId;
        let question = this.questionText.nativeElement.value;
        let questionType = this.questionTypeId;
        let answerIndex = this.correctAnswerIndex;
        let answer = '';
        let one = this.optionOne.nativeElement.value;
        let two = this.optionTwo.nativeElement.value;
        let three = this.optionThree.nativeElement.value;
        let four = this.optionFour.nativeElement.value;

        this.question = new Question(
            id,
            quizNumber,
            round,
            question,
            questionType,
            answerIndex,
            answer,
            one,
            two,
            three,
            four
        );

        this.questionService.saveQuestion(this.question).subscribe(
            res => {
              console.log(res);
            }
      );

        this.questionService.addQuestion(this.question);

    }

    //DB CONNECTION TESTING METHODS

}