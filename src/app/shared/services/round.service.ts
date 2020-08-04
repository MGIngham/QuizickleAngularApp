import { Injectable, EventEmitter } from '@angular/core';
import { Round } from '../models/round.model';
import { QuizService } from './quiz.service';
import { QuestionsService } from './questions.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RoundService {

    rounds: Round[] = [];
    roundsReferenceArray = new EventEmitter<Round[]>();
    roundNumber: number = 0;
    showQuestionComponent = new EventEmitter<boolean>();
    quizId: number;

    quizickleAppUrl: string;
    quizickleServiceApiBaseUrl: string;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })
      };

    constructor(private http: HttpClient){
        this.quizickleAppUrl = environment.appUrl;
        this.quizickleServiceApiBaseUrl = 'api/rounds/';
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

    addRound(quizId: number){
        let r: Round;
        let qId = quizId;
        console.log(quizId + "Help");
        this.roundNumber = this.roundNumber += 1;
        r = new Round(this.roundNumber, "", qId);
        this.rounds.push(r);
        this.roundsReferenceArray.emit(this.rounds.slice());
        this.saveRound(r);
    }

    nameRound(id: number, name: string){
      console.log(id);
      let roundIndex: number = id;
      this.rounds[roundIndex].roundName = name;
    }

    saveRound(round: Round): Observable<Round> {
        return this.http.post<Round>(this.quizickleAppUrl + this.quizickleServiceApiBaseUrl, 
            JSON.stringify(round), 
            this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.errorHandler)
        );
    }

    getRoundsByQuizId(id: number): Observable<Round[]> {
      let getMethodRoute: string = "GetRoundsByQuizId/";
      return this.http.get<Round[]>(this.quizickleAppUrl + this.quizickleServiceApiBaseUrl + getMethodRoute + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    }

}