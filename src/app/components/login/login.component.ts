import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _ToastrService:ToastrService,private _AuthService: AuthService, private _Router: Router) {}
  isLoading: boolean = false;
  apiError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,10}/),
    ])
  });
  
  handleLogin(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.login(registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            localStorage.setItem('userToken',response.token)
            this._AuthService.userToken.next(response.token)
            this._AuthService.decodeUserData()
            this._ToastrService.success(
              ` Welcome back <i class="fa-regular fa-face-smile-beam fa-bounce text-white"></i><i class="fa-solid fa-heart mx-2 fa-beat text-white"></i>`,
              `Hi ${response.user.name}!`, { enableHtml: true,timeOut:5000 }
            );
            // navigate home
            this._Router.navigate(['/home']);
            this.apiError = '';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        },
      });
    }
  }
}
