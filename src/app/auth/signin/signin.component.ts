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
  constructor(public auth : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    this.auth.logIn(form.value.email,form.value.password);
  }

}
