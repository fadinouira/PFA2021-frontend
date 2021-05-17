import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs' ;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { rejects } from 'assert';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token : string;
  private authStatusListener = new Subject<boolean>();
  private authStatus = false;
  private tokenTimer : any;
  private connectedUser : any;
  private connectedUserListener = new Subject<any>();
  private url = 'http://localhost:3200';
  constructor(private http : HttpClient, private router : Router){}

  getToken(){
    return this.token ;
  }

  getAuthStatesListener(){
    return this.authStatusListener ;
  }

  getAuthStatus(){
    return this.authStatus;
  }

  addUser(user : User,image : File){
    const userData = new FormData();
    userData.append("name" , user.name);
    userData.append("email" , user.email);
    userData.append("password" , user.password);
    userData.append("phone" , user.phone.toString());
    userData.append("city" , user.city);
    userData.append("type" , user.type);

    userData.append("image" , image , user.name);
    this.http.post<{message : string}>(this.url + '/api/auth/signup',userData)
    .subscribe((response)=>{
      console.log(response.message);
      this.logIn(user.email,user.password);
      this.router.navigate(["/"]);
    });
  }

  logIn(email: string,password : string){
    const req = {
      email : email,
      password : password
    }
    this.http.post<{message : string,connectedUser : any, token : string, expiresIn : number}>(this.url + '/api/auth/login',req)
      .subscribe(response =>{
        this.token = response.token ;
        if(this.token){
          const expiresIn = response.expiresIn ;
          this.setAuthTimer(expiresIn);
          this.authStatusListener.next(true);
          this.authStatus = true ;
          this.connectedUser = {
            "name" : response.connectedUser.name ,
            "image" : response.connectedUser.image,
            "phone" : response.connectedUser.phone,
            "email" : response.connectedUser.email
          }

          this.connectedUserListener.next(this.connectedUser);
          const now = new Date();
          const expDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveOfData(this.token,expDate,this.connectedUser);
          this.router.navigate(['/']);
        }

      });
  }

  signOut() {
    this.token = null ;
    this.authStatus = false ;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return ;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime() ;
    if(expiresIn > 0){
      this.token = authInfo.token ;
      this.authStatus = true ;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.connectedUserListener.next(authInfo.user);
    }
  }

  private setAuthTimer(dur : number){
    console.log("settint time to :"+ dur);
    setTimeout(()=> {
      this.signOut();
    },dur * 1000);
  }

  private saveOfData(token : string ,expirationDate : Date,user : any){
    console.log(user);
    localStorage.setItem('token', token);
    localStorage.setItem('name', user.name);
    localStorage.setItem('image', user.image);
    localStorage.setItem('phone', user.phone);
    localStorage.setItem('email', user.email);
    localStorage.setItem('expirationDate',expirationDate.toISOString());
    console.log(localStorage);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('image');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if(!token || !expirationDate) {
      return ;
    }
    return {
      token : token ,
      expirationDate : new Date(expirationDate),
      user : {
        name : localStorage.getItem("name"),
        image : localStorage.getItem("image"),
        phone : localStorage.getItem("phone")
      }
    }
  }

  public getUser() : any {
    const user =  {
      name : localStorage.getItem("name"),
      image : localStorage.getItem("image"),
      phone : localStorage.getItem("phone"),
      email : localStorage.getItem("email")
    }
    console.log(user);
    console.log("this is the user");

    if(user){
      return user ;
    }
    return null;
  }

  public getUserNameListener(){
    return this.connectedUserListener ;
  }
}
