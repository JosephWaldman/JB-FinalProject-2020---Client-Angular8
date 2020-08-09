import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private url: string = "http://localhost:61955/"; // כתובת מקומית

  private form: FormGroup; // אובייקט עבור טופס

  get username() { // קבלת ערך משדה שם משתמש
    return this.form.get('username')
  }
  get password() { // קבלת ערך משדה סיסמא
    return this.form.get('password')
  }

  constructor(private http: HttpClient, fb: FormBuilder, private service: AuthServiceService, private route: Router) { 
    this.form = fb.group // פורמ בילדר בונה את הטופס בקונסטרקטור, אחראי בין היתר על ולידציה וולידציה אסינכרונית
      (
        {
          username: ['', Validators.required],
          password: ['', Validators.required]
        }
      )
  }

  Login(Username: string, Password: string) {
    let UserDetails: string = Username + ":" + Password; // שירשור פרטי המשתמש מהשדות
    let Result: any; 

    this.service.Send(UserDetails) // שליחת פרטי המשתמש לשירות, בו מופעלת פונקצית גט
      .subscribe( // אובסרוובל
        u => {
          Result = u; // החזרת אובייקט יוזר אם נמצאה תוצאה
          if (Result != null) {
            this.service.Add(Result); // שמירת האובייקט בשירות, בשיתוף השירות למשתמש יהיו הגבלות על הצפייה באיזורי האתר ועוד
            this.service.Authorization(UserDetails); // שמירת שם משתמש וסיסמא לצורך הרשאה בפונקציות בווב איי פי איי
            this.route.navigate(['/Home']); // לאחר הירשמות, מעבר לדף הבית
          }
          else // במידה ואחר הערכים או יותר אינם נכונים- נציג אלרט
            alert("נסה שנית, אחד או יותר מפרטיך שגויים"); 
        })
  }

  ngOnInit() {
  }
}
