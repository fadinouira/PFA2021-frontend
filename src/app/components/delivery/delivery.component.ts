import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(private activatedRoute: ActivatedRoute, private db : DeliveryService) { }
  ngAfterViewInit(): void {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    console.log(right.clientHeight);
    left.style.minHeight = right.clientHeight+"px" ;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getDelivery(params['id']);
    });

    this.deliverySub = this.db.getDeliveryListener()
    .subscribe((delivery :any) => {
      this.delivery = delivery ;
      
    });



    
  }

  getDelivery(id : string) {
    this.db.getOne(id);
  }

}


