import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ProductsService: ProductsService,
  ) {}
  productId: any;
  productDetails: any;
  isLoading:boolean = true;
  produtRating:number = 0
  solidStars:any[] = [] 
  halfStar:boolean = false
  emptyStar:any[] = []
  imgSrc:string = ''
  @ViewChild('overlay') overlay!:ElementRef;
  @ViewChild('productImage') productImage!:ElementRef;
  @ViewChild('imageContainer') imageContainer!:ElementRef;
  @ViewChild('imageCaption') imageCaption!:ElementRef;
  zooming(e:any){
    this.imageCaption.nativeElement.innerHTML = 'Click to open expanded view'
    this.overlay.nativeElement.style.display = 'block'
    let imageWith = this.imageContainer.nativeElement.offsetWidth
    let imageHeight = this.imageContainer.nativeElement.offsetHeight
    this.overlay.nativeElement.style.backgroundImage  = `url('${e.target.src}')`
    const parentRect = this.imageContainer.nativeElement.getBoundingClientRect()
    let x = e.pageX
    let y = e.pageY
    let posX = ((x - this.imageContainer.nativeElement.offsetLeft) / imageWith) * 100;
    let posY = ((y - this.imageContainer.nativeElement.offsetTop) / imageHeight) * 100;
    this.overlay.nativeElement.style.backgroundPosition =`${posX.toFixed(2)}%  ${posY.toFixed(2)}%`
  }
  hidezooming(){
    this.overlay.nativeElement.style.display = 'none'
    this.imageCaption.nativeElement.innerHTML = 'Roll over image to zoom in'
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.productId = param.get('id');
    });
    this._ProductsService
      .getProductDetails(this.productId)
      .subscribe({
        next:(response) => {
          this.isLoading = false
          this.productDetails = response.data;
          this.produtRating = Number(response.data.ratingsAverage)
          this.solidStars = Array(Math.floor(this.produtRating)).fill(0).map((x, i) => i + 1);
          this.emptyStar = Array(5 - Math.ceil(this.produtRating)).fill(0).map((x, i) => i + 1);
          if(this.produtRating%1 !==0){
            this.halfStar = true
          }
        }
      });
  }
  modalSrc(e:any){
    this.imgSrc = e.target.src
    console.log(this.imgSrc);
    

  }
  customOptions: OwlOptions = {
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:2500,
    autoplaySpeed:1500,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  addToCart(productId: any, name: string) {
    document.getElementById(productId)!.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i>';
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        document.getElementById(productId)!.innerHTML = ' + Add to Cart';
        this._ToastrService.success(
          `${name} Added successfully to your Cart `,
          'Congratulations!'
        );
      },
      error: () => {
        this._ToastrService.error('There is an error', 'Sorry!', {
          timeOut: 3000,
        });
      },
    });
  }
}
