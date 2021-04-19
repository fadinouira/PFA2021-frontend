import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { User } from '../Services/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  test : Date = new Date();
    focus;
    focus1;
    status : string ;
    name : string ;
    email : string ;
    type : string ;
  constructor(private auth: AuthService ) { }

  ngOnInit(): void {
    
  }

  onSwitch(a : number){
    if(a == 1) {
      this.status = "right-panel-active";
    }
    else 
    this.status = "";
  }

  getName(form : NgForm){
    this.name = form.value.name ;
    this.email = form.value.email ;
    this.type = form.value.type ;
  }


  onSubmit(form : NgForm){
    const user : User = {
      id : null ,
      name : this.name ,
      email : this.email ,
      password: form.value.password ,
      phone : form.value.phone,
      city : form.value.city,
      type: this.type
    };
    console.log(user);
    this.auth.addUser(user);
  }







}
