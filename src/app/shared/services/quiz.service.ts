import { Quiz } from '../models/quiz.model';
import { EventEmitter, Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoundService } from './round.service';

@Injectable({
    providedIn: 'root'
  })
export class QuizService {

    quizName: string;
    quiz: Quiz;
    quizReference = new EventEmitter<Quiz>();
    quizIdReference = new EventEmitter<number>();
    backgroundColour: string = '#3cb371';

    quizickleAppUrl: string;
    quizickleServiceApiUrl: string;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })
      };
      constructor(private http: HttpClient) {
          this.quizickleAppUrl = environment.appUrl;
          this.quizickleServiceApiUrl = 'api/quizs/';
      }

    addQuiz(name: string){

        let quizId: number; 
        this.quiz = new Quiz(name, this.backgroundColour);
        this.saveQuiz(this.quiz).subscribe(
          res => {
            console.log(res["quizId"]);
            quizId = res["quizId"];
            this.quizIdReference.emit(quizId);
          }
        );
        this.quizReference.emit(this.quiz);

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


      saveQuiz(quiz): Observable<Quiz> {
        return this.http.post<Quiz>(this.quizickleAppUrl + this.quizickleServiceApiUrl, 
          JSON.stringify(quiz), 
          this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.errorHandler)
        );
    }
}