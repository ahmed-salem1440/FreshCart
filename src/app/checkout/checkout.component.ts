import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  isLoading:boolean = false
  constructor(private _ActivatedRoute:ActivatedRoute,private _Router:Router , private _CartService:CartService ,private _ToastrService:ToastrService){}
  checkoutCartId:string|null = ''
  paymentOption:string|null = ''
  cartItems:any = []
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.checkoutCartId = params.get('cartId')
      this.paymentOption = params.get('payOption')
    })
  }
checkoutForm:FormGroup = new FormGroup({
  details:new FormControl(null),
  phone:new FormControl(null),
  city: new FormControl(null)
})
navigateToPage(url:string){
  window.location.href = url
}
checkout(form:FormGroup){
  this.isLoading=true
  if(this.paymentOption == 'cash'){
    this._CartService.cashOnDelivery(this.checkoutCartId!,form).subscribe({
      next:(response)=>{
        this.isLoading = false
        this.cartItems = response.data.cartItems
        this._CartService.numOfCartItems.next(0)
        this._ToastrService.success(
          `Your order has been successfully received`,
          'Congratulations!'
        );
        this._Router.navigate([`/orders`])
        
      }
    })
  }else if(this.paymentOption == 'onlinePayment'){
    this._CartService.onlinePayment(this.checkoutCartId!,form).subscribe({
      next:(response)=>{
        this.isLoading = false
        this.navigateToPage(response.session.url)
      }
    })
  }else{
    this._Router.navigate(['/nouFound'])
  }
}
}
