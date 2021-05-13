import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    status : string ;
    isLoading : boolean;
    form : FormGroup ;
    clicked1 : boolean ;
    clicked2 : boolean ;

    nameClass ;
    nameError ;

    weightClass ;
    weightError ;

  constructor() { }

  ngOnInit(): void {
    this.nameClass = "input" ;
    this.nameError = "Product Name" ;

    this.weightClass = "input";
    this.weightError = "Weight en gram";

    this.form = new FormGroup({
      name : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(3)]
        }),

      weight : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
    });
  }

  onSwitch(a : number){
    if(a == 1) {
      this.clicked1 = true ;
      this.status = "right-panel-active";    
    }
    else 
    this.status = "";
  }

}
