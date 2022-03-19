import { LoginService } from './../login.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showLogin: boolean = false;
  constructor(private router: Router, public loginService: LoginService,public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  @ViewChild('slickModal1', { static: true })
  slickModal1!: SlickCarouselComponent;
  slides = [
    { img: "../../assets/images/person.jpeg" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/4a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/423b42/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/4a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/4a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/4a2b7a/fff" },
  ];
  slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true, autoplay: true, autoplaySpeed: 2500,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true, autoplay: true, autoplaySpeed: 2000,
          dots: false,
          prevArrow: false,
          nextArrow: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true, autoplaySpeed: 2000,
          dots: false,
          prevArrow: false,
          nextArrow: false
        }
      }
    ]
  };
  slideConfig1 = {
    "slidesToShow": 8, "slidesToScroll": 8,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: false,
        }
      }
    ]
  };

  playVideo() {
    if (this.loginService.getIsLoggedIn()) {
      this.router.navigate(['videos']);
    }
    else {
      const dialogRef = this.dialog.open(LoginComponent,{panelClass: ['slide-animation']});
      //this.loginService.showLoginValue = true;
    }
  }

  receiveLogin(islogin: boolean) {
    this.playVideo();
  }
  getStarted(){
    const dialogRef = this.dialog.open(LoginComponent,{panelClass: ['slide-animation']});
  }
}
