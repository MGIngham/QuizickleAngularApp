import { Component } from '@angular/core';
import { QuestionsService } from './shared/services/questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [QuestionsService]
})
export class AppComponent {
  title = 'quizickle';
}
