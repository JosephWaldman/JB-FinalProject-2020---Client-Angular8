import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarsService { // שירות להעברת מידע בין קומפוננטות

  obj: any; // האובייקט של השירות

  Add(o: object) { // הוספת אובייקט לשירות
    this.obj = o;
  }

  constructor() {
  }

}