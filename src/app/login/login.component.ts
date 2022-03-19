import { LoginService } from '../login.service';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Component,NgZone, OnInit,Output,EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
var config={
  apiKey: "AIzaSyAIrk7d9ItwDfdfHpKQa8ws5AmU1qfOu7Y",
  authDomain: "basheer-fa573.firebaseapp.com",
  projectId: "basheer-fa573",
  storageBucket: "basheer-fa573.appspot.com",
  messagingSenderId: "972779189740",
  appId: "1:972779189740:web:f681146633f9f1bea4bcc9"
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phoneNumber: any;
  reCapthaVerifier: any;
  otp!: string;
  verify: any;
  isOTPVisible:boolean= false;
  loggedin:boolean =false;
  userData:string="";
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.verify =JSON.parse(localStorage.getItem('verificationId') || '{}');
    if(this.verify!=null || this.verify!=''){
      this.loggedin=true;
    }
    firebase.initializeApp(config);
  }
  
  getOTP(divID:string){
    if(this.phoneNumber.length >9 && this.phoneNumber.length<16){
      this.isOTPVisible=true;
      this.loginService.getOTP(this.phoneNumber,divID);
    }
  }

  logIn(){
    this.loginService.login(this.otp);
  };
}
