import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth/Services/auth.service';
import { Item } from 'app/items/services/item.model';
import { ItemService } from 'app/items/services/item.service';
import { Subscription } from 'rxjs';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  id : string ;
  delivery : any ;
  private deliverySub: Subscription;

  requestedItems : Item[] ;

  acceptedItems : Item[] ;

  isLoading : boolean ;
  items : Item[];

  users : any ;

  connectedUser ;

  owner : boolean ;


  constructor(private activatedRoute: ActivatedRoute, private db : DeliveryService, private itemsDb : ItemService , private auth : AuthService) { }

  ngOnInit(): void {
    this.connectedUser = this.auth.getUser();
    this.isLoading = true ;
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getDelivery(params['id']);
    });

    this.deliverySub = this.db.getDeliveryListener()
    .subscribe((delivery :any) => {
      if(delivery.ownerEmail == this.connectedUser.email){
        this.owner = true ;
      }
      console.log(delivery);
      this.delivery = delivery ;
      this.itemsDb.getRequestedItems(this.delivery.listedItems);
      this.itemsDb.getAcceptedItems(this.delivery.acceptedItems);
      this.requestedItems = this.itemsDb.getRequestedItemsList();
      this.acceptedItems = this.itemsDb.getAcceptedItemsList();
      this.isLoading = false ;
    });
  }

  ngOnDestroy() {
    this.id = null ;
    this.delivery = null ;
    this.deliverySub.unsubscribe() ;

    this.requestedItems = null ;
    this.acceptedItems = null ;


    this.isLoading = null ;
    this.items = null ;
  }

  getDelivery(id : string) {
    this.db.getOne(id);
  }

  onAcceptItem(id : string) {
    this.itemsDb.acceptRequestedItem(id , this.id);
    //this.acceptedItems = this.itemsDb.getAcceptedItems(this.delivery.);
  }
  
  onRoad(){
    let req = {
      onRoad : true,
      onDestination : false,
      item : 2
    }
    this.db.onRoad(this.id,req);
  }

  onDestination(){
    let req = {
      onRoad : true,
      onDestination : true,
      item : 3
    }
    this.db.onRoad(this.id,req);
  }

}


