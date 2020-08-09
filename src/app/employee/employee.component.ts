import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  TodaysDate: string; // תאריך של היום
  private RentalDates: any; // השמה של אובייקט למשתנה לוקלי מגט ריקווסט , משמש להשמה של ערכי תאריך בפונקצית קאר רנטל דייטס אנד קוסטס
  private CarCosts: any; // מחזיר אובייקט מגט ריקווסט, משמש לחישוב העלויות
  private url: string = "http://localhost:61955//";
  private h = new HttpHeaders(); // שליחת כותרת עם פרטי המשתמש לצורך הרשאה
  private TotalCost; // עלות כוללת להשכרה
  private TotalRentalDaysCost; // משתנה עבור חישוב עלות יומית
  private TotalRentalDaysCostException; // משתנה עבור חישוב יום איחור

  private AllRentalsHistory; // משתנה לוקלי עבור כל ההזמנות של החברה


  constructor(private http: HttpClient, private Service: AuthServiceService) {
    this.h = this.h.append("Authorization", "Basic " + this.Service.UserAuthorization)

    http.get("http://localhost:61955//Get/Employee/GetCarRentalFields/", { headers: this.h }) // גט ריקווסט עבור כל ההזמנות של החברה
      .subscribe(c => this.AllRentalsHistory = c);
  }

  CloseRental(LicensePlateNumber: number) { // פונקציה לסגירת העסקה, מקבלת ערך זיהוי ייחודי שהוא מספר לוחית רישוי

    let h = new HttpHeaders(); // שליחת כותרת עם פרטי המשתמש לצורך הרשאה
    h = h.append("Authorization", "Basic " + this.Service.UserAuthorization);

    let body: any; // אובייקט ריק לשליחה באייצ' טי טי פי פוט

    this.http.get(this.url + "Get/Employee/CarRentalDates?LicensePlateNumber="  // קבלת אובייקט לצורך חישוב תאריכים
      + LicensePlateNumber + "&Date=" + this.TodaysDate, { headers: h }).subscribe(c => { this.RentalDates = c; });

    this.http.get(this.url + "Get/Employee/ReturnCarCosts?LicensePlateNumber=" // קבלת אובייקט לצורך חישוב עלויות
      + LicensePlateNumber, { headers: h }).subscribe(c => { this.CarCosts = c; });

    this.http.put(this.url + "Put/Employee/CarReturn/?LicensePlateNumber=" // שליחת סיום הזמנה לדאטה בייס
      + LicensePlateNumber + "&Date=" + this.TodaysDate, body, { headers: h })
      .subscribe();
  }

  CarRentalDatesAndCosts() {
    let Start = new Date(this.RentalDates.RentalStartDate).getTime(); // השמת תאריך התחלה מהרכב הנבחר
    let End = new Date(this.RentalDates.ReturnCarDate).getTime();  // השמת תאריך סיום מהרכב הנבחר
    let Approval = new Date(this.RentalDates.ReturnCarDateApproval).getTime();  // השמת תאריך סיום בפעול

    let DaysCalc: number = Math.round(Math.abs(End - Start)); // חישוב ימי ההשכרה לפי אלפיות שניה
    let DiffInDays = Math.round(DaysCalc / (1000 * 3600 * 24)); // חישוב עבור הפרש ימי ההשכרה
    this.TotalRentalDaysCost = DiffInDays * this.CarCosts.DailyCost; // חישוב עבור עלות ימי השכרה רגילים

    if (Approval > End) { //  חישוב עלויות עבור ימי השכרה רגילים וימי איחור
      DaysCalc = Math.round(Math.abs(Approval - End)); // החסרת התאריכים, נמדד באלפיות שניה מינואר 1970
      DiffInDays = Math.round(DaysCalc / (1000 * 3600 * 24)); // חישוב האלפיות-שניה לימים
      this.TotalRentalDaysCostException = DiffInDays * this.CarCosts.DailyMonetaryFine // חישוב עלות יום איחור
      this.TotalCost = this.TotalRentalDaysCost + this.TotalRentalDaysCostException; // חיבור שני העלויות לעלות בפועל
    }

    if (Approval <= End) { // חישוב עלויות עבור השכרה שנסגרה לפני המועד המבוקש
      DaysCalc = Math.round(Math.abs(Approval - Start)); // חישוב הפרש זמני תחילת ההשכרה והחזרה בפועל לאלפיות שניה
      DiffInDays = Math.round(DaysCalc / (1000 * 3600 * 24)); // חישוב אלפיות שניה לימים בפועל
      this.TotalCost = DiffInDays * this.CarCosts.DailyCost;  // חישוב עלות יומית מול מספר ימי ההשכרה בפועל
      this.TotalRentalDaysCost = undefined; // איפוס ערך שלא לצורך הצגתו באתר במקרה ונכנסנו להתניה
    }

    this.http.get("http://localhost:61955//Get/Employee/GetCarRentalFields/", { headers: this.h }) // גט ריקווסט עבור כל ההזמנות של החברה
      .subscribe(c => this.AllRentalsHistory = c);
  }

  ngOnInit() { // קליטת התאריך של היום למשתנה
    let today = new Date(); //
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    this.TodaysDate = yyyy + '-' + mm + '-' + dd; // שירשור של יום, שנה ושנה
  }
}