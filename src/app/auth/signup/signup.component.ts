import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { User } from '../Services/user.model';
import { imageValidator } from './imageValidator.validator';

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
    form : FormGroup ;
    formA : FormGroup ;

    selectImage = true ;
    imgUrl : String ;
    clicked1 : boolean ;
    clicked2 : boolean ;

    nameError = "Name & Prename";
    nameClass = "input";

    emailError = "Email";
    emailClass = "input";

    typeError = "--Please select--";
    typeClass = "input";

    cityError = "City";
    cityClass = "input";

    phoneError = "Phone";
    phoneClass = "input";

    passwordError = "Password";
    passwordClass = "input";

    repeatError = "Repeat password";
    repeatClass = "input";

  constructor(private auth: AuthService,public route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.isLoading = false ;
    this.imgUrl="assets/img/faces/joe-gardner-2.jpg";
    this.form = new FormGroup({
      city : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(3)]
        }),

      phone : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      password : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      repeatPassword : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
    });

    this.formA = new FormGroup({
      name : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(3)]
        }),
      email : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      type : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      image : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)
          ],

          asyncValidators :
          [
            imageValidator
          ],
        }),
    });
  }

  onSwitch(a : number){
    if(a == 1) {
      this.clicked1 = true ;
      let b = false ;
      if(this.formA.get('name').invalid) {
        this.nameError = "Name & Prename are required";
        this.nameClass = "error";
        b = true ;
      }
      else {
        this.nameClass = "input";
      }

      if(this.formA.get('email').invalid) {
        this.emailError = "Invalid Email";
        this.emailClass = "error";
        b = true ;
      }
      else {
        this.emailClass = "input";
      }

      if(this.formA.get('type').invalid) {
        this.typeError = "Type is required";
        this.typeClass = "error";
        b = true ;
      }
      else {
        this.typeClass = "input";
      }

      if(b) {
        return ;
      }
      else {
        this.status = "right-panel-active";
      }      
    }
    else 
    this.status = "";
  }

  onImagePicked(event : Event) {
    const file  =  (event.target as HTMLInputElement).files[0] ;
    this.formA.patchValue({
      image : file
    });

    this.formA.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgUrl = reader.result.toString() ;
      this.selectImage = true ;
    };
  }

  getName(){
    if(this.formA.invalid){
      return ;
    }
    this.name = this.formA.value.name ;
    this.email = this.formA.value.email ;
    this.type = this.formA.value.type ;
  }


  onSubmit(){
    let b = false ;
    if(this.form.get('city').invalid) {
      this.cityError = "City is required";
      this.cityClass = "error";
      b = true ;
    }
    else {
      this.cityClass = "input";
    }

    if(this.form.get('phone').invalid) {
      this.phoneError = "Invalid phone number";
      this.phoneClass = "error";
      b = true ;
    }
    else {
      this.phoneClass = "input";
    }

    if(this.form.get('password').invalid) {
      this.passwordError = "Password must be 6 characters or more";
      this.passwordClass = "error";
      b = true ;
    }
    else {
      this.passwordClass = "input";
    }

    if((this.form.get('repeatPassword').invalid) || this.form.get('password').value != this.form.get('repeatPassword').value) {
      this.repeatError = "Password does not match";
      this.repeatClass = "error";
      b = true ;
    }
    else {
      this.repeatClass = "input";
    }

    if(b) {
      return ;
    }
    this.isLoading = true ;
    const user : User = {
      id : null ,
      name : this.formA.get('name').value ,
      email : this.formA.get('email').value ,
      password: this.form.get('password').value ,
      phone : this.form.get('phone').value,
      city : this.form.get('city').value,
      type: this.formA.get('type').value,
      image : null
    };
    this.auth.addUser(user,this.formA.value.image);
    //this.isLoading = false ;  TO Do make a promise function 
    
  }
}
