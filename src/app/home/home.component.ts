import { LoginService } from './../login.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  showLogin:boolean= false;
  constructor(private router: Router, public loginService:LoginService) { }

  ngOnInit(): void {
   
  }
  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  @ViewChild('slickModal1', { static: true })
  slickModal1!: SlickCarouselComponent;
  slides = [
    { img: "https://dummyimage.com/350x150/423b42/fff" },
    { img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { img: "https://dummyimage.com/350x150/4a2b7a/fff" }
  ];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true,"autoplaySpeed":2500,
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
        centerMode: true, autoplay: true, autoplaySpeed: 2000
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
    "slidesToShow": 4, "slidesToScroll": 4,
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
    ],
     nextArrow: '<button class="btn-next" (click)="next()">next</button>n',
    prevArrow: '<button class="btn-prev" (click)="prev()">prev</button>n',
  };


  playVideo(){
    //console.log(" the logged in verification id from play video is ",this.user_data);
    if(this.loginService.getIsLoggedIn()){
     this.router.navigate(['video']);
    }
    else{
     // this.isLoggedIn=false;
      this.loginService.showLoginValue=true;
    }
    
  }

  receiveLogin(islogin:boolean){
    this.playVideo();
  }

}
