import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../services/item.model';
import { ItemService } from '../services/item.service';

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
    id : string ;

    items :Item[] = [];
    private itemsSub: Subscription;

    nameClass ;
    nameError ;

    weightClass ;
    weightError ;

  constructor(private activatedRoute: ActivatedRoute, private db : ItemService) { }

  ngOnInit(): void {
    this.nameClass = "input" ;
    this.nameError = "Product Name" ;

    this.weightClass = "input";
    this.weightError = "Weight en gram";
    this.db.getUserItem();
    this.db.getItemsistener().subscribe((items : Item[]) => {
      this.items = items ;
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

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

  addItem() {
    const item : Item = {
      id : null ,
      owner : null,
      name : this.form.get('name').value,
      status : 0,
      weight :  this.form.get('weight').value,
    }
    this.db.addItem(item,this.id);
  }

  addExistedItem(itemId){
    this.db.addExistedItem(itemId,this.id);
  }



}
