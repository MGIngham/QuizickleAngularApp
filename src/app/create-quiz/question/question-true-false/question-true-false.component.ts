import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { RoundService } from 'src/app/shared/services/round.service';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
    selector: 'app-question-true-false',
    templateUrl: './question-true-false.component.html',
    styleUrls: ['./question-true-false.component.css']
})

export class QuestionTrueFalseComponent implements OnInit {

    questionTypeId: number = 2;
    backgroundColour: string;

    @ViewChild('questionText') questionText: ElementRef;

    question: Question;

    round: number = 3;

    /*Although the answer is a True or False a number one is used 
    to indicate tru and a 2 to indicate False, instead of a boolean. 
    This allows for hooking into the Question model's correctAnswerIndex 
    porperty instead of creating a fresh propert on the Question model.*/
    correctAnswerIndex: number;

    constructor(private questionService: QuestionsService,
        private roundService: RoundService,
        private quizService: QuizService){}

    ngOnInit(){
        this.backgroundColour = this.quizService.backgroundColour;
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

        this.question = new Question(
            id,
            quizNumber,
            round,
            question,
            questionType,
            answerIndex
        )

        this.questionService.addQuestion(this.question);
        this.questionService.saveQuestion(this.question).subscribe(
            res => {
              console.log(res);
            }
        );

        this.roundService.showQuestionComponent.emit(false);

    }

}