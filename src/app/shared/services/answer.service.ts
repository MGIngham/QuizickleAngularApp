import { Answer } from '../models/answer.model';
import { QuestionsWithAnswers } from '../models/questions-with-answers.model';
import { Question } from '../models/question.model';
import { Subject } from 'rxjs';

export class AnswerService {

    answers: Answer[] = [];
    questionsWithAnswers: QuestionsWithAnswers[] = []
    answersReferenceArray = new Subject<Answer[]>();
    questionAnswerReferenceArray = new Subject<QuestionsWithAnswers[]>();

    /*playerId: number;
    roundId: number;
    questionId: number;
    point: number;
    answerIndex: number;
    answerString: string;*/

    addAnswer(answer: Answer){

        this.answers.push(answer);
        this.answersReferenceArray.next(this.answers.slice());

    }

    addQuestionsAndAnswers(question: Question, answer: Answer){
        
        let questionAndAnswer = new QuestionsWithAnswers(question, answer)
        this.questionsWithAnswers.push(questionAndAnswer);
        this.questionAnswerReferenceArray.next(this.questionsWithAnswers.slice());
    }

}