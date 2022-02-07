import { LoginService } from './login.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'basheer-site';
  isLoggedIn:boolean=false;
  user_data:string="";
  ngOnInit() {
    this.user_data=JSON.parse(localStorage.getItem('user_data') || 'null');
    if(this.user_data!=null){
      this.isLoggedIn= true;
    }
  }
  constructor(public loginService:LoginService){

  }
}
