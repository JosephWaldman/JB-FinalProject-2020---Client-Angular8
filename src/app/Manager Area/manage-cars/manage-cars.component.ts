import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent implements OnInit {

  private TableData;// אובייקט אליו מושמים כל רכבי החברה 
  private url: string = "http://localhost:61955/";
  private ShowEditTable: boolean = false; // משתנה בוליאני לצורך עריכת הטבלה
  private EditRowID: any = ""; // משתנה עבור בחירת שורה לצורך עריכה
  private IsRepaired: string;  // מועבר מהטופס לפונקציה שמוסיפה סוג רכב חדש
  private IsAvailable: string;  // מועבר מהטופס לפונקציה שמוסיפה סוג רכב חדש
  private Thumbnail: string; // משתנה אליו תהיה השמה עם שם קובץ התמונה
  private uploader: FileUploader = new FileUploader({ url: "" }); //  ספרית צד שלישי לשליפת המידע מהקובץ, במקרה זה שם הקובץ, המשך בפונקצית און איניט


  constructor(private http: HttpClient) {
    http.get(this.url + "Get/Admin/GetCarFields/")// גט ריקווסט של רשימת כל הרכבים, כולל לא זמינים
      .subscribe(c => this.TableData = c);
  }

  Edit(value) { // פונקציה עבור עריכת שורות בטבלה, מקבל מזהה ומשווה אותו לאחר מכן באנג'י-איפ לפרופרטי מהאובייקט הנוכחי - 'איי' באיטרציה
    this.EditRowID = value;
  }

  Update(UpdateCarField: any) { // פונקיה הפונה לשרת עם פוט מת'וד, נשלח אובייקט עם השורה שנבחרה מתוך הרשימה
  // יצירת בוליאני עבור שדה האם תוקן
    if (this.IsRepaired=="כן")
      var isRepaired:boolean = true;
    else isRepaired = false;
  // יצירת בוליאני עבור שדה האם זמין
    if(this.IsAvailable=="כן")
    var isAvailable:boolean = true;
    else isAvailable = false;

    this.http.put(this.url + "Put/Admin/PutCarFields",
      {
        "LicensePlateNumber": UpdateCarField.LicensePlateNumber,
        "CarTypeID": UpdateCarField.CarTypeID,
        "CurrentKilometrage": UpdateCarField.CurrentKilometrage,
        "Picture": this.Thumbnail,
        "IsRepaired":isRepaired,
        "IsAvailable": isAvailable,
        "Branch": UpdateCarField.Branch
      }).subscribe();
    this.EditRowID = "";// איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Delete(DeleteCarField: any) {// פונקציה למחיקת רכב מהטבלה
    this.http.delete(this.url + "Delete/Admin/DeleteCarFields?CarID=" +
      DeleteCarField.LicensePlateNumber).subscribe(
        f => {
          this.http.get(this.url + "Get/Admin/GetCarFields/")
            .subscribe(c => this.TableData = c);
        }
      );
    this.EditRowID = "";// איפוס הערך לצורך יציאה מחלון עריכה
  }

  Add(LicensePlateNumber: string, CarTypeID: string, CurrentKilometrage: string, Picture: string, Branch: string) {
    this.http.post(this.url + "Post/Admin/PostCarFields/", // פונקציה להוספת רכב חדש, ערכי השדות הינם הערכים שהפונקציה מקבלת לתוכה, ונשלחים בתור אובייקט לווב איי פי איי
      {
        "LicensePlateNumber": LicensePlateNumber,
        "CarTypeID": CarTypeID,
        "CurrentKilometrage": CurrentKilometrage,
        "Picture": this.Thumbnail,
        "IsRepaired": this.IsRepaired,
        "IsAvailable": this.IsAvailable,
        "Branch": "ראשי"
      }
    ).subscribe(f => {// שורות 63 עד 67 הינן לצורך 'ריענון הדף', כך שנקבל עדכון בטבלה 
      this.http.get(this.url + "Get/Admin/GetCarFields/")
        .subscribe(c => this.TableData = c);
    })
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (item: any) => { // בהשלמת ההעלאה,
      this.Thumbnail = item.file.name
    }; // תבצע השמה של שם הקובץ למשתנה ת'אמבנייל
  };

}