import { Question } from '../models/question.model';
import { EventEmitter } from '@angular/core';
import { Round } from '../models/round.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

    questions: Question[] = [];
    questionsReferenceArray = new Subject<Question[]>();
    questionId: number = 1;
    quizId: number;
    questionSaved = new EventEmitter<boolean>();
    questionSavedBool = false;
    currentRoundId: number;
    questionIndex: number = 1;
    currentQuestionIndex = new EventEmitter<number>();

    quizickleAppUrl: string;
    quizickleServiceApiBaseUrl: string;
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    constructor(private http: HttpClient,
      private quizService: QuizService) {
        this.quizickleAppUrl = environment.appUrl;
        this.quizickleServiceApiBaseUrl = 'api/questions/';

        this.quizService.quizIdReference
        .subscribe(
          (id: number) => {
            this.quizId = id;
          }
        );
    }

      errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }



    addQuestion(question: Question){
        this.questionId += 1;
        question.roundNumber = this.currentRoundId;
        this.questions.push(question);
        this.questionSavedBool = !this.questionSavedBool;
        this.questionSaved.emit(this.questionSavedBool);
        this.questionsReferenceArray.next(this.questions.slice());
    }

    getNextQuestion(){
       return this.questionIndex += 1;
    }

    getQuestions(){
       return this.questions.slice();
    }

    getQuestionsByQuizId(quizId: number): Observable<Question[]> {
      let getMethodRoute: string = "GetQuestionsByQuizId/"
      return this.http
      .get<Question[]>(this.quizickleAppUrl + this.quizickleServiceApiBaseUrl + getMethodRoute + quizId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    }

    //DB CONNECTION TESTING METHODS

    //Get all questions
    getAllQuestions(): Observable<Question[]> {
      return this.http.get<Question[]>(this.quizickleAppUrl + this.quizickleServiceApiBaseUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    }

    saveQuestion(question): Observable<Question> {
      return this.http.post<Question>(this.quizickleAppUrl + this.quizickleServiceApiBaseUrl, 
        JSON.stringify(question), 
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

}

