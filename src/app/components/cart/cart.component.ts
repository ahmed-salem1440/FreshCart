import { Product } from './../../product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  isLoading: boolean = true;
  cartDetails: any = null;
  cartEmprty: string = '';
  cuurentCartId: string = '';
  paymentMethod: string = 'cash';
  paymenyOption(option: string) {
    this.paymentMethod = option;
  }
  constructor(
    private _CartService: CartService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  counterTimeout:any = null;
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        if (response.numOfCartItems == 0) {
          this.cartDetails = []
          this.cartEmprty = 'Your Cart is Empty'
        }
        this.isLoading = false;
        this.cuurentCartId = response.data._id;
      },
      error: (err) => {
        this.isLoading = false;
        this.cartEmprty = 'Your cart is empty';
      },
    });
  }
  removeItem(ProductId: string, name: string) {
    document.getElementById(
      ProductId
    )!.innerHTML = `<i class="text-main fa-solid fa-spinner fa-spin"></i> `;

    this._CartService.removeProduct(ProductId).subscribe({
      next: (response) => {
        document.getElementById(
          ProductId
        )!.innerHTML = `<i class="fa-regular text-danger fa-trash-can "></i> Remove`;
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.cartDetails = response.data;
        if(response.numOfCartItems == 0){
          this.cartEmprty = 'Your Cart is Empty'
        }
        this._ToastrService.success(
          `${name} Removed successfully from your Cart `,
          'Done!'
        );
        if (this.cartDetails.length == 0) {
          this.cartEmprty = 'Your cart is empty';
        }
      },
      error: (err) => {
      },
    });
  }
  updateItemCount(prodctId: string, count: number) {
    if (count == 0) {
      this.removeItem(prodctId, 'The product');
    }else{
      clearTimeout(this.counterTimeout)

      this.counterTimeout = setTimeout(()=>{
        this._CartService.updateItemCount(prodctId, count).subscribe({
          next: (response) => {
            this._CartService.numOfCartItems.next(response.numOfCartItems);
            this.cartDetails = response.data;
            this._ToastrService.success(
              `Product count updated successfully`,
              'Done!'
            );
          },
          error: (err) => {
          },
        });
      },500)
    }

  }
  routerWithCartId(payOption: string) {
    this._Router.navigate([`/checkout/${this.cuurentCartId}/${payOption}`]);
  }
  emptyTheCart(){
    this.cartEmprty = 'Your Cart is Empty'
    document.getElementById('emptyTheCart')!.innerHTML = `<i class="emptyTheCartI fa-solid fa-spinner fa-spin"></i> Empty the Cart`
    this._CartService.deletLoggedUserCart().subscribe({
      next:(response)=>{
        document.getElementById('emptyTheCart')!.innerHTML = `<i class="fa-regular fa-trash-can "></i> Empty the Cart `
        this._ToastrService.success(
              `Your cart is empty now`,
              'Done!'
            );
      }
    })
  }
}
