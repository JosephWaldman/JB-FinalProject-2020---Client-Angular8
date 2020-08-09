import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  private url: string = "http://localhost:61955//";
  private UserID: number = Math.floor(Math.random() * 100000) + 1 // יצירת מזהה ייחודי עבור הרשמת משתמש
  private form: FormGroup; // משתנה מסוג פורם גרופ

  get username() {
    return this.form.get('username')
     //  כאן אלה משתנים המקושרים מתוך האטריביוט פורם קונטרול ניים, קבלת ערכים מהשדה בטופס. 
    //   למשל בפניה ל'יוזר ניימ' נוכל לפנות בקונסטרקטור אל המשתנה ולהוסיף ולידציה
  }
  get password() {
    return this.form.get('password')
  }
  get fullname() {
    return this.form.get('fullname')
  }
  get driverlicense() {
    return this.form.get('driverlicense')
  }
  get gender() {
    return this.form.get('gender')
  }
  get email() {
    return this.form.get('email')
  }
  get birthdate() {
    return this.form.get('birthdate')
  }

  constructor(private http: HttpClient, fb: FormBuilder, private route: Router) {
    this.form = fb.group({ // פורם בילדר למעשה יוצר לנו את הטופס ונוכל לפנות לסוגי ולידציות שונים וגם להכניס ערכי ברירת מחדל
      userID:        ["" + (Math.floor(Math.random() * 10000000) + 1)],// יצירת מזהה ייחודי עבור הרשמת משתמש
      username:      ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)]), [this.UniqueUsernameAsyncValidator(this.http)]], // וולידציה אסיכנרונת המקבלת אייצ'טיטיפי קליינט לתוכה
      password:      ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      fullname:      ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      driverlicense: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")])],
      gender:        ['', Validators.compose([Validators.required])],
      email:         ['', Validators.compose([Validators.required, Validators.email])],
      birthdate:     [''],
      Rank:          ['0']
    });
  }

  UniqueUsernameAsyncValidator = (Http1: HttpClient) => (c: FormControl) => { // ולידציה אסינכרונית לשדה 'שם משתמש' בטופס, פורם קונטרול זה הערך שמוזן בשדה
    if (!c || String(c.value).length === 0) // אם הערך, כלומר מה שהמשתמש הזין, אם הערך מחזיר שקר או שאורכו שווה ערך לאפס תחזיר נאל - והכוונה היא לא להציג שגיאה, הגיוני היה להחזיר נאל כשהערך לא עבר ולידציה, אך בריאקטיב פורמס זה עובד בצורה הפוכה
      return of(null);
    return Http1.get('http://localhost:61955/Get/Guest/UniqueUsername?Username=' + String(c.value))  // כשהמשתמש כן הזין ערך - נשלח את אותו ערך בפונקציה לשרת לבדיקה האם קיים שם המשתמש במערכת
      .pipe(
        map((result: any) => {
          return result == "Accepted" // במידה וקיבלנו אישור
            ? null : { username: true }; // תחזיר נאל, אחרת תחזיר אובייקט עם קי / ווליו עם השם משתמש שתפוס
        })
      )
  };

  NewUserSignUp() { // במידה והולידציה עברה בצורה תקינה, נוכל לגשת לכפתור בטופס ולהוסיף את המשתמש, זו פונקצית ההוספה, פוסט מת'וד ששולחת את כל ערכי הטופס, בבדיקה-  אם האובייקט שקיבלנו מהמת'וד שונה מנאל, ההרשמה הצליחה ולאחריה האתר ישלח אותנו לדף הבית
    this.http.post("http://localhost:61955//Post/Guest/SignUp", this.form.value).subscribe(Response => {
      if (Response != null) {
        alert("הרשמתך לאתר בוצעה בהצלחה!");
        this.route.navigate(['/Home'])
      }
    });
  }
  ngOnInit() {
  }
}
