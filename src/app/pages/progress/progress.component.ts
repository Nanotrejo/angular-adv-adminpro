import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress_1: number = 0;
  progress_2: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  get getProgress1() {
    return `${this.progress_1}%`;
  }

  get getProgress2() {
    return `${this.progress_2}%`;
  }


}
