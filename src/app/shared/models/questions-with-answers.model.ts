import { Question } from './question.model';
import { Answer } from './answer.model';

export class QuestionsWithAnswers {

    playerId: number;
    selectedAnswerIndex: number;
    inputAnswerString: string;
    questionNumber: number;
    roundId: number;
    questionString: string;
    questionTypeId: number;
    correctAnswerIndex: number = 0;
    answerString: string;
    oOne: string;
    oTwo: string;
    oThree: string;
    oFour: string;

    constructor(question: Question, answer: Answer){

        this.playerId = answer.playerId,
        this.selectedAnswerIndex = answer.answerIndex,
        this.inputAnswerString = answer.answerString,
        this.questionNumber = question.questionNumber,
        this.roundId = question.roundNumber,
        this.questionString = question.questionString,
        this.questionTypeId = question.questionTypeId,
        this.correctAnswerIndex = question.correctAnswerIndex,
        this.answerString = question.answerString,
        this.oOne = question.optionOne,
        this.oTwo = question.optionTwo,
        this.oThree = question.optionThree,
        this.oFour = question.optionFour
        
    }
}