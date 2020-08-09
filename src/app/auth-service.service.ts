import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService { // שירות עבור הרשאה ולספק מידע עבור המשתמש 

  UserDetails: any; // שמירת אובייקט יוזר מחלון לוג אין אל שירות זה

  UserAuthorization: string; // שמירת שם משתמש וסיסמא לצורך הרשאת גישה לפונקציות מווב איי פי איי

  private url: string = "http://localhost:61955/"; // כתובת יו אר אל של לוקלהוסט 
  constructor(private http: HttpClient) { }

  Send(UserDetails: string): any // בחלון הלוגין מופעלת פונקציה זו
  {
    return this.http.get(this.url + "Get/Guest/Login?UserDetails=" + UserDetails); // אימות נתוני המשתמש לצורך כניסה לאתר- אותנטיקציה
  }

  Add(UserObject: any) { //  פונקצית לשמירת אובייקט משתמש כאמצעי זיהוי באתר אותוריזציה
    this.UserDetails = UserObject;
  }

  Authorization(UserAuthorization:string){ // השמת שם משתמש וסיסמא למשתנה בשירות
    this.UserAuthorization = UserAuthorization;

  }ןם
}