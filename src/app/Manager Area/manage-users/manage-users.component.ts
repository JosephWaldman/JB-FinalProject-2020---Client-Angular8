import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  private TableData;// אובייקט אליו מושמים כל רכבי החברה
  private LocalHost: string = "http://localhost:61955/";
  private ShowEditTable: boolean = false; // משתנה בוליאני לצורך עריכת הטבלה
  private EditRowID: any = ""; // משתנה עבור בחירת שורה לצורך עריכה
  private Gender: string;  // מועבר מהטופס לפונקציה שמוסיפה סוג רכב חדש
  private Rank: string;  // מועבר מהטופס לפונקציה שמוסיפה סוג רכב חדש
  private Thumbnail:string; // משתנה אליו תהיה השמה עם שם קובץ התמונה
  private uploader:FileUploader = new FileUploader({url: ""}); //  ספרית צד שלישי לשליפת המידע מהקובץ, במקרה זה שם הקובץ, המשך בפונקצית און איניט

  constructor(private http: HttpClient) {
    http.get(this.LocalHost + "Get/Admin/GetUserFields/")// גט ריקווסט של רשימת כל המשתמשים
      .subscribe(c => this.TableData = c);
  }

  Edit(value)  // פונקציה עבור עריכת שורות בטבלה, מקבל מזהה ומשווה אותו לאחר מכן באנג'י-איפ לפרופרטי מהאובייקט הנוכחי - 'איי' באיטרציה
  {
    this.EditRowID = value;
  }

  Update(UpdateUser: any) { // פונקיה הפונה לשרת עם פוט מת'וד, נשלח אובייקט עם השורה שנבחרה מתוך הרשימה
    this.http.put(this.LocalHost + "Put/Admin/PutUserFields",
      {
        "ID": UpdateUser.ID,
        "DriverLicense": UpdateUser.DriverLicense,
        "Username": UpdateUser.Username,
        "Password": UpdateUser.Password,
        "FullName": UpdateUser.FullName,
        "Birthdate": UpdateUser.Birthdate,
        "Gender": UpdateUser.Gender,
        "Email": UpdateUser.Email,
        "Thumbnail": this.Thumbnail,
        "Rank": UpdateUser.Rank
      }).subscribe();
    this.EditRowID = "";// איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Delete(DeleteUser: any)  // פונקציה למחיקת משתמש
  {
    this.http.delete(this.LocalHost + "Delete/Admin/DeleteUserFields/?UserID=" +
      DeleteUser.ID, {}).subscribe(
        f => {
          this.http.get(this.LocalHost + "Get/Admin/GetUserFields/")
            .subscribe(c => this.TableData = c);
        }
      );
    this.EditRowID = "";// איפוס אמצעי מזהה לצורך יציאה מחלון עריכה
  }

  Add(DriverLicense: string, Username: string, Password: string, FullName: string,
    Birthdate: string, Email: string) {this.http.post
      (
        this.LocalHost + "Post/Admin/PostUserFields/", // פונקציה להוספת משתמש/ת חדש/ה, ערכי השדות הינם הערכים שהפונקציה מקבלת לתוכה, ונשלחים בתור אובייקט לווב איי פי איי
        {
          "DriverLicense": DriverLicense,
          "Username": Username,
          "Password": Password,
          "FullName": FullName,
          "Birthdate": Birthdate,
          "Gender": this.Gender,
          "Email": Email,
          "Thumbnail": this.Thumbnail,
          "Rank": this.Rank
        }
      ).subscribe(//סבסקרייב נוסף כדי לרענן ויזואלית את הטבלה בדף
        f => {
          this.http.get(this.LocalHost + "Get/Admin/GetUserFields/").subscribe(c => this.TableData = c);
        }
      )
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile =  (item:any) => { // בהשלמת ההעלאה,
      this.Thumbnail = item.file.name}; // תבצע השמה של שם הקובץ למשתנה ת'אמבנייל
    };
  };