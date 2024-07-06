import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  isLoading:boolean = true
  categories: any[] = [];
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getProductCategories().subscribe({
      next: (response) => {
        this.isLoading = false
        this.categories = response.data;
      },
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed:1000,
    autoplayTimeout:2500,
    navSpeed: 700,
    navText: ['previous', 'next'],
    responsive: {
      0: {
        items: 7,
      },
    },
    nav: false,
  };
}
