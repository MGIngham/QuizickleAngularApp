export class Answer {

    playerId: number;
    roundId: number;
    questionId: number;
    point: number;
    answerIndex: number;
    answerString: string;

    constructor(pId: number,
        rId: number,
        qId: number,
        point: number,
        answerIndex: number,
        answerString?: string){
            this.playerId = pId;
            this.roundId = rId;
            this.questionId = qId;
            this.point = point;
            this.answerIndex = answerIndex;
            this.answerString = answerString;
    }

}