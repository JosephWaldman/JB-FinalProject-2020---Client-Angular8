import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarsService } from '../Cars.service';

@Component({
  selector: 'car-select',
  templateUrl: './car-select.component.html',
  styleUrls: ['./car-select.component.css']
})
export class CarSelectComponent implements OnInit {

  private SearchOption: string = "None"; // ערך ברירת מחדל עבור שדה החיפוש

  private AvailableCars: any; // כלל הרכבים הזמינים בחברה

  private ObjectToService: any; // העברת מידע לשירות בעזרת משתנה, הערכים יועברו לקומפוננט קאר אורדר

  private BackToCarObject: any[] = []; // כלל הרכבים שהתעניינת בהם

  private bool: boolean = false; // משתנה בוליאני עבור ההצגה של הרכבים שהתעניינת בהם

  constructor(http: HttpClient, private Service: CarsService) {
    http.get("http://localhost:61955//Get/Guest/AvailableCars").subscribe(c => this.AvailableCars = c); // השמת כלל האובייקטים של הרכבים הזמינים למשתנה לוקלי
  }

  CarSelectionService(value) { // בלחיצה על אחד מהרכבים בדף, נשלח אובייקט לשירות, ונהפוך את חלון 'רכבים שהתעניינת בהם' לזמין בעזרת בוליאן
    this.ObjectToService = value;
    this.Service.Add(this.ObjectToService);
    this.bool = true;
  }

  ToLocalStorage(Car: any) {  // העברת נתוני הרכב ללוקאל סטוראג'
    for (let i = 0; i <= localStorage.length; i++) { // לולאת פור שרצה על האורך של הקולקשן
      if (localStorage.getItem(Car.LicensePlateNumber) == undefined) { // בדיקת כפילויות
        if (localStorage.length < 5) {  // התניה של עד 5 מכוניות לכל היותר
          localStorage.setItem(Car.LicensePlateNumber, JSON.stringify(Car)); // השמה ללוקאל סטוראג'
        }
      }
    }
  }

  ngOnInit() {  // שליפת הנתונים מלוקל סטוראג' אל משתנה לוקלי בקומפוננטה
    for (let i = 0; i < localStorage.length; i++) {
      let Key = localStorage.key(i); // השגת ערך המפתח למשתנה, בעזרתו נוכל לפנות לערך של אותו מפמתח, במקרה שלנו הרכב בו המשתמש התעניין
      let CarObject = JSON.parse(localStorage.getItem(Key)); // , המרה למשתנה לוקלי, השמת הערך
      this.BackToCarObject.push(CarObject);
    }
    if (localStorage.length > 0)
      this.bool = true; //  הפוך בוליאן לאמת עבור הצגת חלון 'מכוניות שהתעניינת בהם' למשתמש
  }
}