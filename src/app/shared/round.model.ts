export class Round {
    roundId: number;
    roundName: string;
    showQuestions: boolean = false;

    constructor(id: number, name: string){
        this.roundId = id;
        this.roundName = name;
    }
}