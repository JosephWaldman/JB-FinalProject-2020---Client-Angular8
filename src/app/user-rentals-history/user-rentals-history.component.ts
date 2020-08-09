import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'user-rentals-history',
  templateUrl: './user-rentals-history.component.html',
  styleUrls: ['./user-rentals-history.component.css']
})
export class UserRentalsHistoryComponent implements OnInit {

  UserRentalHistory :any; // אובייקט אליו נקבל את הרשומות ממסד הנתונים

  constructor(http: HttpClient, service:AuthServiceService) {
    http.get("http://localhost:61955//Get/User/UserRentalsHistory?id=" // גט ריקווסט עבור הזמנות של משתמש ספציפי, השתמשתי בשירות  על מנת למשוך שדה מזהה של המשתמש המחובר לאתר
    +service.UserDetails.ID).subscribe(c => this.UserRentalHistory = c);
  }
  ngOnInit() {
  }
}
