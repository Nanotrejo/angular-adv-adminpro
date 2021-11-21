import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels1: String[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
    [350, 450, 100],
  ];
  public labels2: String[] = ['Download', 'In-Store', 'Mail-Order'];
  public data2 = [
    [20, 50, 100],
  ];
  constructor() { }

  ngOnInit(): void {
  }



}
