import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  test : Date = new Date();
    focus;
    focus1;
    isLoading : boolean ;
  constructor(public auth : AuthService) { }

  ngOnInit(): void {
    this.isLoading = false ;
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    this.isLoading = true ;
    this.auth.logIn(form.value.email,form.value.password);
  }

}
