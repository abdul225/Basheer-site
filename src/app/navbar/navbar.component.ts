import { LoginService } from './../login.service';

import { Component,NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user_data: any;
  isLoggedIn:boolean =false;
  constructor(private afAuth: AngularFireAuth,
    private ngZone: NgZone,public loginService:LoginService) { }

  ngOnInit(): void {
    this.user_data=JSON.parse(localStorage.getItem('user_data') || 'null');
    if(this.user_data!=null){
      this.isLoggedIn= true;
    }
  }
  links=[
  "Live Channels", "Videos", "Series", "Audio", "Kids "
  ]
  logout() {
    this.loginService.logout();
    // return this.afAuth.signOut().then(() => {
    //   this.ngZone.run(() => {
    //     //console.log("the app has been logged out");
    //     localStorage.setItem('verificationId',JSON.stringify(null));
    //     localStorage.setItem('user_data',JSON.stringify(null));
    //    // User.isLoggedIn=false;
    //    this.isLoggedIn= false;
    //   });
    // });
  }
  login(){
    this.loginService.setShowLogin(true);
  }
}
