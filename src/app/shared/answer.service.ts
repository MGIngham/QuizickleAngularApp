import { EventEmitter } from '@angular/core';
import { Answer } from './answer.model';
import { QuestionsWithAnswers } from './questions-with-answers';
import { Question } from './question.model';

export class AnswerService {

    answers: Answer[] = [];
    questionsWithAnswers: QuestionsWithAnswers[] = []
    answersReferenceArray = new EventEmitter<Answer[]>();
    questionAnswerReferenceArray = new EventEmitter<QuestionsWithAnswers[]>();

    /*playerId: number;
    roundId: number;
    questionId: number;
    point: number;
    answerIndex: number;
    answerString: string;*/

    addAnswer(answer: Answer){

        this.answers.push(answer);
        this.answersReferenceArray.emit(this.answers.slice());

    }

    addQuestionsAndAnswers(question: Question, answer: Answer){
        
        let questionAndAnswer = new QuestionsWithAnswers(question, answer)
        this.questionsWithAnswers.push(questionAndAnswer);
        this.questionAnswerReferenceArray.emit(this.questionsWithAnswers.slice());
    }

}