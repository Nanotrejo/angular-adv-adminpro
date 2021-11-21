import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {

  @Input('value') progress: number = 0;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() valueOutput: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value > 0) {
      this.valueOutput.emit(100);
      return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0) {
      this.valueOutput.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);
  }

  onChange(value: number) {
    if (this.progress >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0
    } else {
      this.progress = value;
    }
    this.valueOutput.emit(this.progress);
  }

}
