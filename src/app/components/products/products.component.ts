import { ProductsService } from './../../products.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  isLoading:boolean = true
  products:any[] = []
  searchTerm:string = ''
  constructor(private _ProductsService:ProductsService,private _CartService:CartService,private _ToastrService:ToastrService ){}
  ngOnInit():void{
   this._ProductsService.getProducts().subscribe({
     next:(response)=>{
       this.isLoading = false
       this.products = response.data
     },
     error:(err)=>{
      
      this.isLoading = false
     }
   })
  }
   addToCart(ProductId:string,name:string){
    document.getElementById(ProductId)!.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
  this._CartService.addToCart(ProductId).subscribe({
    next:(response)=>{
      this._CartService.numOfCartItems.next(response.numOfCartItems)
    document.getElementById(ProductId)!.innerHTML = ' + Add to Cart'

      this._ToastrService.success(`${name} Added successfully to your Cart `, 'Congratulations!');

    },
    error:(err)=>{
      this._ToastrService.error('There is an error', 'Sorry!', {
        timeOut: 3000,
      })
      
    }
  })
}
}
