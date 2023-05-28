import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin:boolean = false;
  numOfCartItems = new BehaviorSubject(0);
  logOut(){
    this._AuthService.logOut()
  }
  constructor(private _AuthService:AuthService , private _CartService:CartService ,private _ProductService:ProductService){
    _AuthService.userData.subscribe({
      next:()=>{
        if(_AuthService.userData.getValue()!== null){
          this.isLogin = true
        }else{
          this.isLogin = false
        }
      }
    })
    _CartService.numOfCartItems.subscribe({
      next:(value)=>{
        this.numOfCartItems.next(value)
      }
    })


  }


}
