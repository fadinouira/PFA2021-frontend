import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/Services/auth.service';
import { Item } from 'app/items/services/item.model';
import { ItemService } from 'app/items/services/item.service';
import { Demande } from '../services/demande.model';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit {
  isLoading : boolean ;
  status = "";
  form : FormGroup ;
  itemForm : FormGroup ;


  nameClass = "input" ;
  nameError ;

  weightClass = "input" ;
  weightError ;
  constructor(private db : DemandeService,private auth : AuthService,private itemService : ItemService) { }

  ngOnInit(): void {
    // this.isLoading = true ;
    this.nameClass = "input" ;
    this.nameError = "Product Name" ;

    this.weightClass = "input" ;
    this.weightError = "Product Weight" ;

    this.form = new FormGroup({
      from : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
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
      arrivalTime : new FormControl(
        null,
        {
          validators:
          [
            Validators.required,
            Validators.minLength(5)]
        }),
    });

    this.itemForm = new FormGroup({
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
        })
    });

  }

  onSwitch(a : number){
    if(a == 1) {
      this.status = "right-panel-active";
    }
    else 
    this.status = "";
  }

  addDemande() {
    console.log(this.form.value);
    let user = this.auth.getUser();
    let demande : Demande = {
      id : null,
      owner : null,
      ownerName : user.name,
      ownerPhoto : user.image,
      ownerPhone : user.phone,
      ownerEmail : user.email,
      originAddress : this.form.get('from').value,
      deliveryAddress : this.form.get('to').value,
      wantedArrivalDate : new Date(this.form.get('date').value + " " + this.form.get('arrivalTime').value),
      itemShipped :false,
      itemDelivered : false,
      item : this.itemService.getAddedItem().id,
      provider: null,
      listedProviders : []
    }
    this.db.addDemande(demande);
  }

  addItem() {
    let user = this.auth.getUser() ;
    const item : Item = {
      id : null ,
      owner : null,
      ownerName : user.name,
      ownerPhoto : user.image,
      name : this.itemForm.get('name').value,
      status : 0,
      weight :  this.itemForm.get('weight').value,
    }
    this.itemService.addItem(item,"");
  }


}
