import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private Service:AuthServiceService,private Route:Router) { 
  }

Signout(){ // שליחת ערך נאל לשירות תוציא את המשתמש מהאתר
  this.Service.Add(null);
}

  ngOnInit() {
  }

}
