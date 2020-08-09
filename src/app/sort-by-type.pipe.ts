import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SortBy'
})
export class SortByTypePipe implements PipeTransform {

  transform(value: any, args: string, SearchOption: string): any { // הפייפ מקבל 3 משתנים, הראשון הוא רשימת הרכבים מתוך דף הרכבים, המשתנה השני הוא מה שכתבנו בתיבת טקסט עבור חיפוש ומשתנה שלישי הוא סוג החיפוש 

    let NewCarList: any = []; // מערך רכבים חדש

    if (args == undefined && SearchOption == undefined) // במידה ולא כתבנו כלום בתיבת טקסט, או בחרנו קטגוריה, הצג את כלל הרכבים הזמינים
      return value;

    switch (SearchOption) {
      case "GearBoxAuto":
        for (let i = 0; i < value.length; i++) { // רץ על מספר האיברים שברשימת הרכבים
          if (value[i].GearBox.indexOf("אוטומטית") > -1) 
            NewCarList.push(value[i]); // אם מצא שברשימה ישנו מאפיין באחד האובייקטים שזהה לערך, ייקח את אותו אובייקט ויושם אל מערך הרכבים החדש
        } return NewCarList; // החזרה של מערך הרכבים החדש לדף בחירת רכב

      case "GearBoxManual":
        for (let i = 0; i < value.length; i++) { // רץ על מספר האיברים שברשימת הרכבים
          if (value[i].GearBox.indexOf("ידנית") > -1)
            NewCarList.push(value[i]);
        } return NewCarList; // החזרה של מערך הרכבים החדש לדף בחירת רכב

      case "ManufactureYear":
        for (let i = 0; i < value.length; i++) { // רץ על מספר האיברים שברשימת הרכבים
          let ManufactureYear = value[i].ManufactureYear + ""; // השמת ערך המאפיין במשתנה
          if (args != undefined) { // אם ישנו ערך בשדה החיפוש
          if (ManufactureYear.indexOf(args.toLowerCase()) > -1) 
            NewCarList.push(value[i]); // אם מצא שברשימה ישנו מאפיין באחד האובייקטים שזהה לערך, ייקח את אותו אובייקט ויושם אל מערך הרכבים החדש
          }
        } return NewCarList;// החזרה של מערך הרכבים החדש לדף בחירת רכב

      case "ManufacturerName":
        for (let i = 0; i < value.length; i++) { // רץ על מספר האיברים שברשימת הרכבים
          if (args != undefined) {// אם ישנו ערך בשדה החיפוש
          if (value[i].ManufacturerName.toLowerCase().indexOf(args.toLowerCase()) > -1)
            NewCarList.push(value[i]); // אם מצא שברשימה ישנו מאפיין באחד האובייקטים שזהה לערך, ייקח את אותו אובייקט ויושם אל מערך הרכבים החדש
          }
        } return NewCarList;// החזרה של מערך הרכבים החדש לדף בחירת רכב

      case "Model":
        for (let i = 0; i < value.length; i++) { // רץ על מספר האיברים שברשימת הרכבים
          if (args != undefined) {// אם ישנו ערך בשדה החיפוש
          if (value[i].Model.toLowerCase().indexOf(args.toLowerCase()) > -1)
            NewCarList.push(value[i]); // אם מצא שברשימה ישנו מאפיין באחד האובייקטים שזהה לערך, ייקח את אותו אובייקט ויושם אל מערך הרכבים החדש
          }
        } return NewCarList;// החזרה של מערך הרכבים החדש לדף בחירת רכב

      case "None":
        return value;

      case "FreeText": // חיפוש עם טקסט חופשי
        for (let i = 0; i < value.length; i++) { // רץ על מספר האיברים שברשימת הרכבים
          let DailyCost = value[i].DailyCost + ""; 
          let CurrentKilometrage = value[i].CurrentKilometrage + "";
          let ManufactureYear = value[i].ManufactureYear + "";
          if (args != undefined) {// אם ישנו ערך בשדה החיפוש
            if (  // אם מצא שברשימה ישנו מאפיין אחד, באחד האובייקטים שזהה לערך, ייקח את אותו אובייקט ויושם אל מערך הרכבים החדש
              value[i].ManufacturerName.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
              value[i].Model.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
              DailyCost.indexOf(args.toLowerCase()) > -1 ||
              ManufactureYear.indexOf(args.toLowerCase()) > -1 ||
              value[i].GearBox.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
              CurrentKilometrage.indexOf(args.toLowerCase()) > -1 ||
              value[i].Branch.toLowerCase().indexOf(args.toLowerCase()) > -1
            )
              NewCarList.push(value[i]);
          }
        } return NewCarList;// החזרה של מערך הרכבים החדש לדף בחירת רכב
    }
  }
}
