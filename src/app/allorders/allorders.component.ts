import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';
import { NavbarComponent } from '../components/navbar/navbar.component';
NavbarComponent
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  isLoading = true
  allOrders:any[] = []

  constructor(private _ActivatedRoute:ActivatedRoute , private _CartService:CartService ,private _AuthService:AuthService){}
  encodedToken = JSON.stringify( localStorage.getItem('userToken'));
  decodedToken:any = jwtDecode(this.encodedToken)
  userId:string|null = this.decodedToken.id

  ngOnInit(): void {
    this._CartService.getLoggedUserOrders(this.userId!).subscribe({
      next:(response)=>{
        this.isLoading = false
        this.allOrders = response
      }
    })
  }
}
