import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { Quiz } from 'src/app/shared/models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-quiz',
  templateUrl: './add-new-quiz.component.html',
  styleUrls: ['./add-new-quiz.component.css']
})
export class AddNewQuizComponent implements OnInit {

  colourPickerSelected: boolean = false;
  quiz: Quiz;
  @ViewChild('quizNameInput') quizNameInput: ElementRef;
  nameInputNullCheck: string;
  enableCreateQuizButton: boolean = true;

  constructor(private quizService: QuizService, private router: Router) { }

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

    try {
      if(quizName == '') throw "Quiz name cannot be empty! Please name me.";
      else{
        this.quizService.addQuiz(quizName);
        this.router.navigate(['/create-quiz']);
        console.log(quizName);
      }  
    }
    catch (err) {
      alert(err);
    }

  }

  enableButton(){
    this.nameInputNullCheck == '' ? this.enableCreateQuizButton = true : this.enableCreateQuizButton = false;
  }

}
