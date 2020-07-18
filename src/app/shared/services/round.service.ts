import { Injectable, EventEmitter } from '@angular/core';
import { Round } from '../models/round.model';

@Injectable({
    providedIn: 'root'
})

export class RoundService {

    rounds: Round[] = [];
    roundsReferenceArray = new EventEmitter<Round[]>();
    roundNumber: number = 0;
    showQuestionComponent = new EventEmitter<boolean>();

    addRound(){
        let r: Round;
        this.roundNumber = this.roundNumber += 1;
        r = new Round(this.roundNumber, "");
        this.rounds.push(r);
        this.roundsReferenceArray.emit(this.rounds.slice());
    }

    nameRound(id: number, name: string){
      console.log(id);
      let roundIndex: number = id;
      this.rounds[roundIndex].roundName = name;
    }

}