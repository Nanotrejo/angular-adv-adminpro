import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const promises = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hello');
      } else {
        reject('Algo salió mal');
      }
    });

    promises.then((msg) => {
      console.log(msg);
    }).catch((err) => {
      console.log('Error Promise: ', err);
    });

    this.getUsers().then(users => {
      console.log(users);
    });
  }

  getUsers() {

    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));

    });
  }
}
