import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, MinLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { RegisterRequest } from '../../services/register/registerRequest';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userRegistered:boolean = false;
  passwordType:string = 'password';

  registerError:string = "";
  registerForm = this.formBuilder.group({
    username:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(8)]],
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    country:['', Validators.required]
  });

  constructor(private formBuilder:FormBuilder, private router:Router, private registerService:RegisterService, private http:HttpClient) {
    this.userRegistered = false;
  }

  ngOnInit():void {
    
  }

  get email(){
    return this.registerForm.controls.username;
  }
  get password(){
    return this.registerForm.controls.password;
  }
  get firstname(){
    return this.registerForm.controls.firstname;
  }
  get lastname(){
    return this.registerForm.controls.lastname;
  }
  get country(){
    return this.registerForm.controls.country;
  }


  signin(){
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) => {
          
        },
        error: (errorData) => {
          this.registerError = errorData;
        },
        complete: () => {
          this.userRegistered = true;
          this.registerForm.reset();
        }
      }) ;
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  togglePassword(){
    if(this.passwordType=='password'){
      this.passwordType='text';
    }
    else{
      this.passwordType='password';
    }
  }
}
