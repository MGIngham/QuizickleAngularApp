import { Component, AfterViewInit, DoCheck, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.css']
})
export class QuizContainerComponent implements OnInit {

  startQuiz: boolean = false;
  currentQuestionId: number;

  createQuiz = true;

  constructor(private questionService: QuestionsService) {}

  ngOnInit(){

  }

}
