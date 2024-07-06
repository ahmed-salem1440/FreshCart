import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private _ToastrService: ToastrService,private _AuthService:AuthService,private _ActivatedRoute:ActivatedRoute,private _Router:Router){}
  action:string|null = '';
  isLoading:boolean = false
  message:boolean = false
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe((pamars)=>{
        if((pamars.get('action') == 'change-password')||(pamars.get('action') == 'change-data')){
          this.action = pamars.get('action')
        }else{
          this._Router.navigate(['/notfound'])
        }
      })
  }
  changePassword:FormGroup = new FormGroup({
    currentPassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
  },{validators:this.rePasswordMatch})
  rePasswordMatch(changePassword:any){
    let password = changePassword.get('password')
    let rePassword = changePassword.get('rePassword')
    let rePasswordError = {raPasswordMatching:'Password and rePassword does not match'}
    if(password.value === rePassword.value){
      return null
    }else{
      rePassword.setErrors(rePasswordError)
      
      return rePasswordError
    }
  }
  handleChangePassword(form:any){
    this.isLoading = true
    this._AuthService.changePassword(form.value).subscribe({
      next:(response)=>{
      this.isLoading = false
      this.message = true
        document.getElementById('changeMessage')!.classList.remove('bg-danger')
        document.getElementById('changeMessage')!.classList.add('bg-main')
        document.getElementById('changeMessage')!.innerHTML = `<p class="fw-bold my-2">Password changed successfully</p>`
        this._ToastrService.success(
          `Password changed successfully`,
          'Congratulations!'
        );
        setTimeout(()=>{
        this._AuthService.logOut()
        },1000)

    },
    error:(err)=>{
      
    this.isLoading = false
    this.message = true
    document.getElementById('changeMessage')!.classList.add('bg-danger')
    document.getElementById('changeMessage')!.classList.remove('bg-success')
    document.getElementById('changeMessage')!.innerHTML = `<p class="fw-bold my-2">${err.error.errors.msg}</p>`
  }})
    console.log(form.value);
    
  }
  changeData:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^(002|\+2)?01[125][0-9]{8}$/)]),
  })
  handleChangeData(form:any){
    this.isLoading = true
    this._AuthService.changeData(form.value).subscribe({
      next:(response)=>{
        this.isLoading = false
        this.message = true
        document.getElementById('changeMessage')!.classList.remove('bg-danger')
        document.getElementById('changeMessage')!.classList.add('bg-main')
        document.getElementById('changeMessage')!.innerHTML = `<p class="fw-bold my-2">Your Information changed successfully</p>`
        this._ToastrService.success(
          `Your Information changed successfully`,
          'Congratulations!'
        );
      },
      error:(err)=>{
        this.isLoading = false
        this.message = true
        document.getElementById('changeMessage')!.classList.remove('bg-success')
        document.getElementById('changeMessage')!.innerHTML = `<p class="fw-bold my-2">${err.error.errors.msg}</p>`
        document.getElementById('changeMessage')!.classList.add('bg-danger')
      }
    })
  }
}
