import { Component } from '@angular/core';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { enviroment } from '../../../enviroments/enviroment';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent  {
  authenticatedUserId:number = 0;
  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    country:['',Validators.required]
  })

  constructor(private userService:UserService, private formBuilder:FormBuilder,
    private loginService:LoginService, private registerService:RegisterService ){
    this.registerService.getAuthenticatedUserId().subscribe({
      next: (userId) => {
        this.authenticatedUserId = userId;
        this.userService.getUser(this.authenticatedUserId).subscribe({
          next: (userData) => {
            this.user=userData;
            this.registerForm.controls.id.setValue(userData.id.toString());
            this.registerForm.controls.firstname.setValue(userData.firstname);
            this.registerForm.controls.lastname.setValue(userData.lastname);
            this.registerForm.controls.country.setValue(userData.country);
          },
          error: (errorData) => {
            this.errorMessage=errorData
          },
          complete: () => {
          }
        })
      }
    })
    
    

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
    
  }

  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get country()
  {
    return this.registerForm.controls.country;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

}