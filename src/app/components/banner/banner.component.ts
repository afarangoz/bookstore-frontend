import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {


  pictures: string[] =[
    'assets/pictures/banner/HarryPotter_1.png',
    'assets/pictures/banner/HarryPotter_2.png',
    'assets/pictures/banner/HarryPotter_3.png',
    'assets/pictures/banner/HarryPotter_4.png'
  ]
 
  swiper: Swiper;

  constructor() { }

  ngOnInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
