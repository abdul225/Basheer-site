import { LoginService } from './../login.service';

import { Component,NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user_data: any;
  isLoggedIn:boolean =false;
  constructor(private afAuth: AngularFireAuth,
    private ngZone: NgZone,public loginService:LoginService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user_data=JSON.parse(localStorage.getItem('user_data') || 'null');
    if(this.user_data!=null){
      this.isLoggedIn= true;
    }
  }
  links=[
  {name:'Live Channels',url:'/live'},
   {name:'Videos',url:'/videos'},
    {name:'Series',url:'/series'},
     {name:'Audio',url:'/audio'}, 
     {name:'Kids',url:'/kids'}
  ]
  logout() {
    this.loginService.logout();
  }
  login(){
    // this.loginService.setShowLogin(true);
    const dialogRef = this.dialog.open(LoginComponent,{panelClass: ['slide-animation']});
  }
}
