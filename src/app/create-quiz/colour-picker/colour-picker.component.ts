import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.css']
})
export class ColourPickerComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  addBackgroundColour(colour: string){
    this.quizService.backgroundColour = colour;
  }

}
