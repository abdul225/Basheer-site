import { LoginService } from './../login.service';
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
    console.log("the verification id from the login component is ",this.verify);
  }
  @Output() LoginEvent = new EventEmitter<boolean>();

  getOTP(){
    console.log("the phone length is ", this.phoneNumber.length);
    if(this.phoneNumber.length >9 && this.phoneNumber.length<16){
      this.isOTPVisible=true;
      this.loginService.getOTP(this.phoneNumber);
      // this.reCapthaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button',{size:'invisble'})
  
      // firebase.auth().signInWithPhoneNumber(this.phoneNumber,this.reCapthaVerifier).then((confirmationResult) =>{
      //   console.log(confirmationResult);
      //   localStorage.setItem('verificationId',JSON.stringify(confirmationResult.verificationId));
      // }).catch((error)=>{
      //   alert(error.message)
      //   setTimeout(()=>{
      //     window.location.reload();
      //   },5000);
      // });
    }
    
    //localStorage.setItem('user_data',JSON.stringify("logged"));
    
    
    //this.loggedin=true;
    //console.log("is logged in ",User.isLoggedIn);
    
   // console.log("the post login value of user is ",User.verificationId);
   
  }


  logIn(){
    console.log("the otp is :",this.otp);
    this.loginService.login(this.otp);
    //this.verify =JSON.parse(localStorage.getItem('verificationId') || '{}');
    // var credential = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);
    // firebase.auth().signInWithCredential(credential).then((response)=>{
    //   console.log(response);
    //   console.log("logged in successfully");
    //   localStorage.setItem('user_data',JSON.stringify(response));
    //   this.userData=localStorage.getItem('user_data') || "";
    //   console.log("this userdata from the local storage is ",this.userData);
    //   //console.log("the loggin is logged in value is",User.isLoggedIn);
    //   this.LoginEvent.emit(this.loggedin);
    // }).catch((error)=>{
    //   alert(error.message);
    //    console.log("error msg is ",error.meassage);
    //  })
    //  localStorage.setItem('user_data',JSON.stringify("logged"));
    //  User.isLoggedIn = true;
    
    //this.LoginEvent.emit(this.loggedin);
  };
  
}
