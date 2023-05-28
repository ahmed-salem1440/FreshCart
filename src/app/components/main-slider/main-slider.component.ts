import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent {
  customOptions: OwlOptions = {
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:2500,
    autoplaySpeed:1500,
    loop: true,
    mouseDrag: true ,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false,
    
  }

}
