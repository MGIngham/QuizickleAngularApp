import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Quiz } from 'src/app/shared/quiz.model';

@Component({
  selector: 'app-add-new-quiz',
  templateUrl: './add-new-quiz.component.html',
  styleUrls: ['./add-new-quiz.component.css']
})
export class AddNewQuizComponent implements OnInit {

  quiz: Quiz;
  @ViewChild('quizNameInput') quizNameInput: ElementRef;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.quizReference
    .subscribe(
        (quiz: Quiz) => {
            this.quiz = quiz;
        }
    )
  }

  addNewQuiz(){
    let quizName = this.quizNameInput.nativeElement.value;
    this.quizService.addQuiz(quizName);
  }

}
