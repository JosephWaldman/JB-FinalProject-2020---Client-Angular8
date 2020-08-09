import { Component, OnInit } from '@angular/core';
import { CarsService } from '../Cars.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'car-order',
  templateUrl: './car-order.component.html',
  styleUrls: ['./car-order.component.css']
})
export class CarOrderComponent implements OnInit {

  private obj: any; // משתנה המקבל את נתוני המכונית שבחרת מקומפוננט קאר סלקט,
  private StartRentalDate: Date; // תחילת תאריך השכרה, מקושר לשדה דייט בדף
  private EndRentalDate: Date; // סיום תאריך השכרה
  private RentalDays: number; // המספר הכולל של ימי ההשכרה שנבחרו על ידי המשתמש

  constructor(private http: HttpClient, private Service: CarsService, private AuthService: AuthServiceService) {
    this.obj = this.Service.obj;  // העברת הנתונים מקומפוננט בחירת רכב בעזרת השירות
  }

  DateCalc() {
    let Start = new Date(this.StartRentalDate).getTime(); // קביעת נתוני תאריך למשתנה
    let End = new Date(this.EndRentalDate).getTime();     // קביעת נתוני תאריך למשתנה
    let DaysCalc: number = Math.round(Math.abs(Start - End)); //  חישוב תאריכי השכרה באלפיות שניה מ1970
    let DiffInDays = Math.round(DaysCalc / (1000 * 3600 * 24)); // חישוב תאריכי השכרה לימים בפועל
    this.RentalDays = DiffInDays; // השמה
  }

  NewCarOrder() {                                 // הזמנת מכונית חדשה
    if (this.AuthService.UserDetails != null) {   // אימות בדיקת הרשה למשתמש
      this.http.post("http://localhost:61955//Post/User/NewCarRental", // פוסט ריקווסט עבור הזמנה חדשה, שולחים אובייקט
        {
          "UserID": this.AuthService.UserDetails.ID, // מזהה ייחודי מהשירות ההרשאות 
          "LicensePlateNumber": this.obj.LicensePlateNumber,
          "RentalStartDate": this.StartRentalDate,
          "ReturnCarDate": this.EndRentalDate
        }
      ).subscribe(c => {
        if (c != null)
          alert("הזמנתך בוצעה בהצלחה!");
      });
    }
    else alert("משתמש לא רשום, הינך מוזמן לאיזור הרשמה על מנת להשכיר רכב");
  }
  ngOnInit() {
  }

}
