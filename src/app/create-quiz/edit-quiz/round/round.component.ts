import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  questionsIndex: number[] = [1,2,3,4,5]
  @Input() roundName: string;

  constructor() { }

  ngOnInit() {
  }


}
