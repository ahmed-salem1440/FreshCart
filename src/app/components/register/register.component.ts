import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService ,private _Router:Router){}
  isLoading:boolean = false
  apiError:string = ''
  registerForm:FormGroup = new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
  rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^(002|\+2)?01[0125][0-9]{8}$/)]),
},{validators:this.rePasswordMatch});
rePasswordMatch(registerForm:any){
  let password = registerForm.get('password')
  let rePassword = registerForm.get('rePassword')
  let rePasswordError = {raPasswordMatching:'Password and rePassword does not match'}
  if(password.value === rePassword.value){
    return null
  }else{
    rePassword.setErrors(rePasswordError)
    return rePasswordError
  }
}
handleRegister(registerForm:FormGroup){
  this.isLoading = true
  if(registerForm.valid){
    this._AuthService.register(registerForm.value).subscribe({
      next:(response)=>{
        this.isLoading=false
        if(response.message ==='success'){
          // navigate login
          this._Router.navigate(['/login'])
          this.apiError = ''
        }
      },
      error: (err)=>{
        
        this.isLoading=false
          this.apiError = err.error.message;
      } 
        
        
    })
  }
}
}
