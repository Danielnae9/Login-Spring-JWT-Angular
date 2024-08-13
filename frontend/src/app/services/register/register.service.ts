import { Injectable } from '@angular/core';
import { LoginRequest } from '../auth/loginRequest';
import { RegisterRequest } from './registerRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { enviroment } from '../../../enviroments/enviroment';
import { Observable, catchError, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userUsername:string = '';

  constructor(private http:HttpClient) { }

  register(credentials:RegisterRequest){
    return this.http.post<any>(enviroment.urlHost+"auth/register", credentials).pipe(
      catchError(this.handlerError)
    );
  }

  private handlerError(error:HttpErrorResponse){
    return throwError(() => new Error('El email ya esta registrado.'));
  }
  
  getAuthenticatedUserId(): Observable<number> {
    return this.http.get<number>(enviroment.urlApi+'/user/username/'+this.userUsername);
  }
  
  setUserUsername(username:string){
    this.userUsername = username;
  }
}
