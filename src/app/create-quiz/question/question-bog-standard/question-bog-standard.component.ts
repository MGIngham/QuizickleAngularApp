import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { Question } from 'src/app/shared/models/question.model';
import { RoundService } from 'src/app/shared/services/round.service';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
    selector: 'app-question-bog-standard',
    templateUrl: './question-bog-standard.component.html',
    styleUrls: ['./question-bog-standard.component.css']
})

export class QuestionBogStandardComponent implements OnInit {

    questionTypeId: number = 3;
    backgroundColour: string;

    question: Question;

    @ViewChild('question') questionText: ElementRef;
    @ViewChild('answer') answerText: ElementRef;

    constructor(private questionService: QuestionsService,
        private roundService: RoundService,
        private quizService: QuizService){

    }

    ngOnInit(){
        this.backgroundColour = this.quizService.backgroundColour;
    }

    addQuestion(){

        let id = this.questionService.questionId;
        let quizNumber = this.questionService.quizId;
        let round = this.questionService.currentRoundId;
        let question = this.questionText.nativeElement.value;
        let questionType = this.questionTypeId;
        let answer = this.answerText.nativeElement.value;

        this.question = new Question(id,
            quizNumber,
            round,
            question,
            questionType,
            0,
            answer);

        this.questionService.addQuestion(this.question);
        this.questionService.saveQuestion(this.question).subscribe(
            res => {
              console.log(res);
            }
        );

        this.roundService.showQuestionComponent.emit(false);

    }

}