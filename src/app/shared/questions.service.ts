import { Question } from './question.model';
import { EventEmitter } from '@angular/core';
import { Round } from './round.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

    questions: Question[] = [];
    questionsReferenceArray = new EventEmitter<Question[]>();
    rounds: Round[] = [];
    roundsReferenceArray = new EventEmitter<Round[]>();
    questionId: number = 1;
    quizId: number;
    questionSaved = new EventEmitter<boolean>();
    questionSavedBool = false;
    roundNumber: number = 0;
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
        this.questionsReferenceArray.emit(this.questions.slice());
    }

    addRound(r: Round){
        this.roundNumber = this.roundNumber += 1;
        r.roundId = this.roundNumber;
        this.rounds.push(r);
        this.roundsReferenceArray.emit(this.rounds.slice());
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