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
  isLoading : boolean ;


  constructor(private activatedRoute: ActivatedRoute, private db : DeliveryService) { }
  ngAfterViewInit(): void {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    console.log(right.clientHeight);
    left.style.minHeight = right.clientHeight+"px" ;
  }

  ngOnInit(): void {
    this.isLoading = true ;
    this.activatedRoute.params.subscribe(params => {
      this.getDelivery(params['id']);
    });

    this.deliverySub = this.db.getDeliveryListener()
    .subscribe((delivery :any) => {
      this.delivery = delivery ;
      this.isLoading = false ;
    });



    
  }

  getDelivery(id : string) {
    this.db.getOne(id);
  }

}


