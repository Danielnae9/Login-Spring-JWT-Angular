import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  
  constructor(private http:HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }
  
  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(enviroment.urlHost+"auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handlerError)
      );
    }
    
    logout():void{
      sessionStorage.removeItem("token");
      this.currentUserLoginOn.next(false);
    }

  private handlerError(error:HttpErrorResponse){
    return throwError(() => new Error('Email o contraseña incorrectos.'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String {
    return this.currentUserData.value;
  }
}
