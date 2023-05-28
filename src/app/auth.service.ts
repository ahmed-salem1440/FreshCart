import { environment } from './../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);
  userToken = new BehaviorSubject(null);
  // headers:any ={token: localStorage.getItem('userToken')}
  headers:any;
  constructor(private _HttpClient:HttpClient,private _Router:Router,) {
    if(localStorage.getItem('userToken')){
      this.decodeUserData()
      this.headers = {token: localStorage.getItem('userToken')}
    }
    this.userToken.subscribe({
      next:(newData)=>{
        if(newData){
          this.headers = {token: localStorage.getItem('userToken')}
        }
      }
    })
  }
  register(userData:object):Observable<any> {
    return this._HttpClient.post( environment.baseURL+'api/v1/auth/signup',userData)
  }
  login(userData:object):Observable<any> {
    return this._HttpClient.post( environment.baseURL+'api/v1/auth/signin',userData)
  }
  decodeUserData(){
    let encodedToken = JSON.stringify( localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken)
    this.userData.next(decodedToken)
  }
  changePassword(changeform:any):Observable<any>{
    return this._HttpClient.put( environment.baseURL+'api/v1/users/changeMyPassword',changeform,{
      headers:this.headers
    })
  }
  changeData(changeform:any):Observable<any>{
    return this._HttpClient.put( environment.baseURL+'api/v1/users/updateMe/',changeform,{
      headers:this.headers
    })
  }
  forgetPassword(userData:any):Observable<any>{
    return this._HttpClient.post(environment.baseURL+'api/v1/auth/forgotPasswords',userData)
  }
  varifyResetCode(userData:any):Observable<any>{
    return this._HttpClient.post(environment.baseURL+'api/v1/auth/verifyResetCode',userData)
  }
  resetPassword(userData:any):Observable<any>{
    return this._HttpClient.put(environment.baseURL+'api/v1/auth/resetPassword',userData)
  }
  logOut(){
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this.userToken.next(null)
    this._Router.navigate(['/login'])
  }
}
