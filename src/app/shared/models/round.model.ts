export class Round {
    roundId: number;
    roundName: string;
    quizId: number;

    constructor(id: number, name: string, quizId: number){
        this.roundId = id;
        this.roundName = name;
        this.quizId = quizId;
    }
}