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
export class DeliveryComponent implements OnInit ,AfterViewInit{
  id : string ;
  delivery : any ;
  private deliverySub: Subscription;

  requestedItems : Item[] ;

  acceptedItems : Item[] ;

  isLoading : boolean ;
  items : Item[];

  users : any ;


  constructor(private activatedRoute: ActivatedRoute, private db : DeliveryService, private itemsDb : ItemService , private auth : AuthService) { }
  ngAfterViewInit(): void {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    console.log(right.clientHeight);
    left.style.minHeight = right.clientHeight+"px" ;
  }

  ngOnInit(): void {
    this.isLoading = true ;
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getDelivery(params['id']);
    });

    this.deliverySub = this.db.getDeliveryListener()
    .subscribe((delivery :any) => {
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

}


