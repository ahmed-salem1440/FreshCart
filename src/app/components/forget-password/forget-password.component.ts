import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  responseMsg:string = ''
  constructor(private _AuthService:AuthService,private _Router:Router){}
  isLoading:boolean = false
  isError:boolean = false
  isSent:boolean = false
  isCodeError:boolean = false
  errorMsg:any;
  EnteredEmail:string = ''
  forgetPassordForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
  })
  
  handleforgetPassword(form:FormGroup){
    this.isLoading = true
    this._AuthService.forgetPassword(form.value).subscribe({
      next:(response)=>{
        this.isError = false
        this.EnteredEmail = form.value.email
        this.responseMsg = response.message
        this.isLoading=false
        this.isSent = true
        
      },
      error:(err)=>{
        this.isError = true
        this.errorMsg = err.error.message
        this.isLoading=false
        this.isError = true
      }
    })
    
  }
    resetCodeForm:FormGroup = new FormGroup({
      resetCode: new FormControl(null,[Validators.required]),
    })
    handleReset(form:FormGroup){
      document.getElementById("codeBtn")!.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
      this._AuthService.varifyResetCode(form.value).subscribe({
        next:(response)=>{
          this.isError = false
          document.getElementById("codeBtn")!.innerHTML = 'Submit'
          document.getElementById('sendCodeForm')?.classList.add('d-none')
          document.getElementById('enterCodeForm')?.classList.add('d-none')
          document.getElementById('resetPasswordForm')?.classList.add('d-block')
          document.getElementById('resetPasswordForm')?.classList.remove('d-none')
        },
        error:(err)=>{
          this.isCodeError = true
          document.getElementById("codeBtn")!.innerHTML = 'Submit'
          document.getElementById("codeError")!.innerHTML = `<p class="m-0">${err.error.message}</p>`
          document.getElementById("codeError")!.classList.add('d-block')
          document.getElementById("codeError")!.classList.remove('d-none')
        }
      })
    }
    resetPsswordForm:FormGroup = new FormGroup({
      email: new FormControl(this.EnteredEmail,[Validators.required,Validators.email]),
      newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    })
    handleResetPassword(form:FormGroup){
      document.getElementById("newPasswordBtn")!.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
      this._AuthService.resetPassword(form.value).subscribe({
        next:(response)=>{
          this.isError = false
          document.getElementById("newPasswordBtn")!.innerHTML = 'Submit'
          this._Router.navigate(['/login'])
        },
        error:(err)=>{
          document.getElementById("NewPasswordMsg")!.innerHTML = `<p class="m-0">${err.error.message}</p>`
          
          document.getElementById("newPasswordBtn")!.innerHTML = 'Submit'
          
        }
      })
    }


}
