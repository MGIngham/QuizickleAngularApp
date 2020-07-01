export class Question {

    /*Mandatory Question properties. All instances 
    of the Question object must include these properties.*/ 
    questionNumber: number;
    quizId: number;
    roundNumber: number;
    questionString: string;
    questionTypeId: number; /*Defines type of questoin: 
    1 = Multiple Choice
    2 = True/False
    3 = Bog standard*/

    /*Optional Question object properties. The properties used 
    will depend upon the type of question, e.g. True/Fale or Multiple Choice.*/
    answerString: string;
    truOrFalse: boolean;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string;
    correctAnswerIndex: number;

    constructor(qNumber: number,
        qId: number,
        rNumber: number,
        q: string,
        qTypeId: number,
        answerIndex: number,
        answer?: string,
        oOne?: string,
        oTwo?: string,
        oThree?: string,
        oFour?: string){
            this.questionNumber = qNumber;
            this.quizId = qId;
            this.roundNumber = rNumber;
            this.questionString = q;
            this.questionTypeId = qTypeId;
            this.correctAnswerIndex = answerIndex;
            this.answerString = answer;
            this.optionOne = oOne;
            this.optionTwo = oTwo;
            this.optionThree = oThree;
            this.optionFour = oFour;
        }
}