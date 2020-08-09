import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'manage-car-types',
  templateUrl: './manage-car-types.component.html',
  styleUrls: ['./manage-car-types.component.css']
})
export class ManageCarTypesComponent implements OnInit {

  private TableData; // אובייקט אליו מושמים כל רכבי החברה 
  private url: string = "http://localhost:61955/";
  private body: any; // שליחת אובייקט ריק לצורך שליחת האדרס לווב איי פי איי
  private ShowEditTable: boolean = false; // משתנה בוליאני לצורך עריכת הטבלה
  private EditRowID: any = ""; // משתנה עבור בחירת שורה לצורך עריכה
  private GearBox: string; // סוג גיר, מועבר מהטופס לפונקציה שמוסיפה סוג רכב חדש

  constructor(private http: HttpClient) {
    http.get(this.url + "Get/Admin/GetCarTypes/") // גט ריקווסט של רשימת כל סוגי הרכבים
      .subscribe(c => this.TableData = c);
  }

  Edit(value) { // פונקציה עבור עריכת שורות בטבלה, מקבל מזהה ומשווה אותו לאחר מכן באנג'י-איפ לפרופרטי מהאובייקט הנוכחי - 'איי' באיטרציה
    this.EditRowID = value;
  }

  Update(UpdateCarType: any) { // פונקיה הפונה לשרת עם פוט מת'וד, נשלח אובייקט עם השורה שנבחרה מתוך הרשימה
    this.http.put(this.url + "Put/Admin/PutCarTypes",
      {
        "CarTypeID": UpdateCarType.CarTypeID,
        "ManufacturerName": UpdateCarType.ManufacturerName,
        "Model": UpdateCarType.Model,
        "DailyCost": UpdateCarType.DailyCost,
        "DailyMonetaryFine": UpdateCarType.DailyMonetaryFine,
        "ManufactureYear": UpdateCarType.ManufactureYear,
        "GearBox": UpdateCarType.GearBox
      }).subscribe();
    this.EditRowID = ""; // איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Delete(DeleteCarType: any) { // פונקציה למחיקת סוג רכב
    this.http.delete(this.url + "Delete/Admin/DeleteCarTypes/?CarTypeID=" +
      DeleteCarType.CarTypeID ).subscribe(
        f => {
          this.http.get(this.url + "Get/Admin/GetCarTypes/")
            .subscribe(c => this.TableData = c);
        }
      );
    this.EditRowID = "";// איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Add(CarTypeID: string, ManufacturerName: string, Model: string, DailyCost: string, DailyMonetaryFine: string, ManufactureYear: string, GearBox: string) {
    this.http.post(this.url + "Post/Admin/PostCarTypes/", // פונקציה להוספת סוג רכב חדש, ערכי השדות הינם הערכים שהפונקציה מקבלת לתוכה, ונשלחים בתור אובייקט לווב איי פי איי
      {
        "CarTypeID": CarTypeID,
        "ManufacturerName": ManufacturerName,
        "Model": Model,
        "DailyCost": DailyCost,
        "DailyMonetaryFine": DailyMonetaryFine,
        "ManufactureYear": ManufactureYear,
        "GearBox": this.GearBox
      }
      ).subscribe(f => { // שורות 63 עד 67 הינן לצורך 'ריענון הדף', כך שנקבל עדכון בטבלה 
        this.http.get(this.url + "Get/Admin/GetCarTypes/")
          .subscribe(c => this.TableData = c);
      })
  }

  ngOnInit() {
  }

}