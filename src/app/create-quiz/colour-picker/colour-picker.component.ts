import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.css']
})
export class ColourPickerComponent implements OnInit {

  @Output() closeColourPicker = new EventEmitter<boolean>();
  @Output() colour = new EventEmitter<string>();

  colours: string[] = [
    "#ff9933",
    "#ff3300",
    "#00cc00",
    "#0066ff",
    "#d680f0",
    "#ffff00"
  ];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  addBackgroundColour(colour: string){
    this.colour.emit(colour);
    this.closeColourPicker.emit();
  }

}
