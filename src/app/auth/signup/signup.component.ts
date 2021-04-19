import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    
  }

  onSwitch(a : number){
    if(a == 1) {
      this.status = "right-panel-active";
      console.log(this.status);
    }
    else 
    this.status = "";
    console.log(this.status);
  }







}
