import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  private TableData;// אובייקט אליו מושמים כל רכבי החברה 
  private url: string = "http://localhost:61955/";
  private ShowEditTable: boolean = false; // משתנה בוליאני לצורך עריכת הטבלה
  private EditRowID: any = ""; // משתנה עבור בחירת שורה לצורך עריכה

  constructor(private http: HttpClient) {
    http.get(this.url + "Get/Admin/GetCarRentalFields/")// גט ריקווסט של רשימת כל ההשכרות של החברה
      .subscribe(c => this.TableData = c);
  }

  Edit(value) { // פונקציה עבור עריכת שורות בטבלה, מקבל מזהה ומשווה אותו לאחר מכן באנג'י-איפ לפרופרטי מהאובייקט הנוכחי - 'איי' באיטרציה
    this.EditRowID = value;
  }

  Update(UpdateCarRental: any) { // פונקיה הפונה לשרת עם פוט מת'וד, נשלח אובייקט עם השורה שנבחרה מתוך הרשימה
    this.http.put(this.url + "Put/Admin/PutCarRentalFields",
      {
        "ID": UpdateCarRental.ID,
        "UserID": UpdateCarRental.UserID,
        "LicensePlateNumber": UpdateCarRental.LicensePlateNumber,
        "RentalStartDate": UpdateCarRental.RentalStartDate,
        "ReturnCarDate": UpdateCarRental.ReturnCarDate,
        "ReturnCarDateApproval": UpdateCarRental.ReturnCarDateApproval
      }).subscribe();
    this.EditRowID = "";// איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Delete(DeleteCarRental: any) {// פונקציה למחיקת השכרה
    this.http.delete(this.url + "Delete/Admin/DeleteCarRentalFields?CarRentalID=" +
      DeleteCarRental.ID, {}).subscribe(
        f => {
          this.http.get(this.url + "Get/Admin/GetCarRentalFields/")
            .subscribe(c => this.TableData = c);
        }
      );
    this.EditRowID = "";// איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Add(UserID: string, LicensePlateNumber: string, RentalStartDate: string, ReturnCarDate: string, ReturnCarDateApproval: string) {
    this.http.post(this.url + "Post/Admin/PostCarRentalFields", // פונקציה להוספת השכרת רכב חדשה, ערכי השדות הינם הערכים שהפונקציה מקבלת לתוכה, ונשלחים בתור אובייקט לווב איי פי איי
      {
        "UserID": UserID,
        "LicensePlateNumber": LicensePlateNumber,
        "RentalStartDate": RentalStartDate,
        "ReturnCarDate": ReturnCarDate,
        "ReturnCarDateApproval": ReturnCarDateApproval
      }
    ).subscribe(f => {// שורות 63 עד 67 הינן לצורך 'ריענון הדף', כך שנקבל עדכון בטבלה 
      this.http.get(this.url + "Get/Admin/GetCarRentalFields/")
        .subscribe(c => this.TableData = c);
    })
  }


  ngOnInit() {
  }

}
