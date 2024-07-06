import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems = new BehaviorSubject(0)
  headers:any ;
  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) {
    if(localStorage.getItem('userToken')){
      this.headers = {token: localStorage.getItem('userToken')}
    }
    if(localStorage.getItem('userToken')){
      this.getLoggedUserCart().subscribe({
        next:(response)=>{
          this.numOfCartItems.next(response.numOfCartItems)
        }
      })  
    }

    _AuthService.userToken.subscribe({
      next:(newData)=>{
        if(newData){
          this.headers = {token: localStorage.getItem('userToken')}
        }
      }
    })
  }
  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post(environment.baseURL+'api/v1/cart',{
      productId:productId
    },{
      headers:this.headers
    })
  }
  getLoggedUserCart():Observable<any>{
 return this._HttpClient.get(environment.baseURL+`api/v1/cart`,{
  headers:this.headers
})
  }
  deletLoggedUserCart():Observable<any>{
 return this._HttpClient.delete(environment.baseURL+`api/v1/cart`,{
  headers:this.headers
})
  }
  getLoggedUserOrders(userId:string):Observable<any>{
 return this._HttpClient.get(environment.baseURL+`api/v1/orders/user/${userId}`,{
  headers:this.headers
})
  }
  removeProduct(productId:string):Observable<any>{
    return this._HttpClient.delete(environment.baseURL+`api/v1/cart/${productId}`,{
      headers:this.headers
    })
  }
  updateItemCount(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(environment.baseURL+`api/v1/cart/${productId}`,
    {count:count},{
      headers:this.headers
    })
  }
  cashOnDelivery(cartId:string,shippingAddress:any):Observable<any>{
    return this._HttpClient.post(environment.baseURL+`api/v1/orders/${cartId}`,
    {
      shippingAddress:shippingAddress
    },{
      headers:this.headers
    })
  }
  onlinePayment(cartId:string,shippingAddress:any):Observable<any>{
    return this._HttpClient.post(environment.baseURL+`api/v1/orders/checkout-session/${cartId}?url=https://ahmed-salem1440.github.io/FreshCart`,
    {
      shippingAddress:shippingAddress
    },{
      headers:this.headers
    })
  }
}
