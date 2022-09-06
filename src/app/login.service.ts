import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';
var config={
  apiKey: "AIzaSyAIrk7d9ItwDfdfHpKQa8ws5AmU1qfOu7Y",
  authDomain: "basheer-fa573.firebaseapp.com",
  projectId: "basheer-fa573",
  storageBucket: "basheer-fa573.appspot.com",
  messagingSenderId: "972779189740",
  appId: "1:972779189740:web:f681146633f9f1bea4bcc9"
}
@Injectable()
export class LoginService implements CanActivate{
  verify: any=JSON.parse(localStorage.getItem('verificationId') || '{}');
  reCapthaVerifier: any;
  phoneNumber: any;  
  isLoggedIn:boolean=false;
  showLoginValue:boolean=false;
  otp!: string;
  userData:any=JSON.parse(localStorage.getItem('user_data')||'null');
  constructor(private router:Router,private afAuth: AngularFireAuth,
    private ngZone: NgZone, public dialog: MatDialog) {
      
    if(this.userData !=null){
      this.isLoggedIn=true;     
    }
    
    firebase.initializeApp(config);
    
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.isLoggedIn){
        return true;
      }
      else{
        const dialogRef = this.dialog.open(LoginComponent,{panelClass: ['slide-animation']});
        return false;
      }
  }
  getIsLoggedIn():boolean{
    return this.isLoggedIn;
  }
  setLogIn(loginValue:boolean){
    this.isLoggedIn= loginValue;
  }
  setShowLogin(value:boolean){
    this.showLoginValue=value;
  }
  getOTP(number:string,Id:string){
    this.phoneNumber=number;
    this.reCapthaVerifier = new firebase.auth.RecaptchaVerifier(Id,{size:'invisble',})
  
      firebase.auth().signInWithPhoneNumber(this.phoneNumber,this.reCapthaVerifier).then((confirmationResult) =>{
        //console.log(confirmationResult);
        localStorage.setItem('verificationId',JSON.stringify(confirmationResult.verificationId));
        this.verify =confirmationResult.verificationId;
      }).catch((error)=>{
        alert(error.message)
        setTimeout(()=>{
          window.location.reload();
        },5000);
      });
      
  }
  login(otpValue:string){
    this.otp=otpValue;
    var credential = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);
    firebase.auth().signInWithCredential(credential).then((response)=>{
      //console.log(response);
      //console.log("logged in successfully");
      localStorage.setItem('user_data',JSON.stringify(response));
      this.userData=localStorage.getItem('user_data') || "";
     // console.log("this userdata from the local storage is ",this.userData);
      //console.log("the loggin is logged in value is",User.isLoggedIn);
      //this.LoginEvent.emit(this.loggedin);
      this.isLoggedIn=true;
      this.dialog.closeAll();
      this.router.navigate(['videos']);
    }).catch((error)=>{
      alert(error.message);
       //console.log("error msg is ",error.meassage);
     })
  }
  logout() {
    return this.afAuth.signOut().then(() => {
      this.ngZone.run(() => {
        //console.log("the app has been logged out");
        localStorage.setItem('verificationId',JSON.stringify(null));
        localStorage.setItem('user_data',JSON.stringify(null));
       // User.isLoggedIn=false;
       this.isLoggedIn= false;
       this.router.navigate(['']);
      });
    });
  }
}
