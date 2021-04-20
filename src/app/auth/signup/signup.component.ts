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
    isLoading : boolean;
  constructor(private auth: AuthService ) { }

  ngOnInit(): void {
    this.isLoading = false ;
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
    this.isLoading = true ;
    const user : User = {
      id : null ,
      name : this.name ,
      email : this.email ,
      password: form.value.password ,
      phone : form.value.phone,
      city : form.value.city,
      type: this.type
    };
    this.auth.addUser(user);
    //this.isLoading = false ;  TO Do make a promise function 
    
  }







}
