import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginError:string = "";
  loginForm = this.formBuilder.group({
    username:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService, private registerService:RegisterService) {}

  ngOnInit():void {

  }

  get email(){
    return this.loginForm.controls.username;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      const emailValue = this.email.value;
      if (emailValue) {
        this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
          next: (userData) => {
            
          },
          error: (errorData) => {
            this.loginError = errorData;
          },
          complete: () => {
            this.registerService.setUserUsername(emailValue);
            this.router.navigateByUrl('/inicio');
            this.loginForm.reset();
          }
        }) ;
      } else {
        this.loginForm.markAllAsTouched();
      }
    }
      
  }

}
