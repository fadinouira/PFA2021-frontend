import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isLoading : boolean ;
  items : Item[];


  constructor(private activatedRoute: ActivatedRoute, private db : DeliveryService, private itemsDb : ItemService) { }
  ngAfterViewInit(): void {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    console.log(right.clientHeight);
    left.style.minHeight = right.clientHeight+"px" ;
  }

  ngOnInit(): void {
    console.log("on unit");
    this.isLoading = true ;
    this.activatedRoute.params.subscribe(params => {
      this.getDelivery(params['id']);
    });

    this.deliverySub = this.db.getDeliveryListener()
    .subscribe((delivery :any) => {
      this.delivery = delivery ;
      this.itemsDb.getRequestedItems(this.delivery.listedItems);
      this.requestedItems = this.itemsDb.getRequestedItemsList() ;  
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

     

}


