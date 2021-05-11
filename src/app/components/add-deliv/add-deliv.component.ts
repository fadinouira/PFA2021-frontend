import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/Services/auth.service';
import { Delivery } from '../services/delivery.model';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-add-deliv',
  templateUrl: './add-deliv.component.html',
  styleUrls: ['./add-deliv.component.scss']
})
export class AddDelivComponent implements OnInit {
  isLoading : boolean ;
  status = "";
  form : FormGroup ;
  constructor(private db : DeliveryService,private auth : AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      from : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(3)]
        }),

      to : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      date : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      departTime : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
      arrivalTime : new FormControl(
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
      this.status = "right-panel-active";
    }
    else 
    this.status = "";
  }

  addDeliv() {
    console.log(this.form.value);
    let user = this.auth.getUser();
    console.log(user);
    let deliv : Delivery = {
      id : null,
      ownerName : user.name,
      ownerPhoto : user.image,
      ownerPhone : user.phone,
      ownerEmail : user.email,
      originAddress : this.form.get('from').value,
      deliveryAddress : this.form.get('to').value,
      departDate : new Date(this.form.get('date').value + " " + this.form.get('departTime').value),
      expectedArrivalDate : new Date(this.form.get('date').value + " " + this.form.get('arrivalTime').value),
      owner : null,
      onRoad : false,
      onDestination : false,
      acceptedItems : null,
      listedItems : null,
    }
    this.db.addDelivery(deliv);
  }


}
