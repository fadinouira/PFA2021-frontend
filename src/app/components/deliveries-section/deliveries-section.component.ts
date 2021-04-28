import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'app/auth/Services/auth.service';
import { Subscription } from 'rxjs';
import { Delivery } from '../services/delivery.model';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-deliveries-section',
  templateUrl: './deliveries-section.component.html',
  styleUrls: ['./deliveries-section.component.scss']
})
export class DeliveriesSectionComponent implements OnInit {
  deliveries :Delivery[] = [] ;
  private deliveriesSub: Subscription ;
  private maxDeliveriesSub: Subscription ;
  private userAuthSub : Subscription ;
  public isLoading : boolean;
  totalDeliveries : number;
  postPerPage = 8 ;
  pageSizeOption = [8,16,32,64];
  currentPage = 1 ;
  userLogedIn = this.auth.getAuthStatus() ;
  owner : any ;
  constructor(public deliveryService : DeliveryService, private auth : AuthService) { }

  ngOnInit(): void {
    this.deliveryService.getDeliveries(this.postPerPage,this.currentPage) ;
    this.isLoading = true;
    this.deliveriesSub = this.deliveryService.getDeliveriesListener()
    .subscribe((deliveries : Delivery[]) => {
      this.deliveries = deliveries ;
      this.isLoading = false;
    });
    this.maxDeliveriesSub = this.deliveryService.getMaxDeliveriesListener()
    .subscribe((totalDeliveries : number) => {
      this.totalDeliveries = totalDeliveries ;
    });
    this.userAuthSub = this.auth.getAuthStatesListener().subscribe(result => {
      this.userLogedIn = result ;
    });

  }

  ngOnDestroy(): void {
    this.deliveriesSub.unsubscribe();
  }



  // onDelete(id : string){
  //   this.isLoading = true;
  //   this.postService.deletePost(id);
  //   this.isLoading = false;
  // }

  onChangePage(pageData : PageEvent){
    console.log(pageData);
    this.isLoading = true;
    this.postPerPage = pageData.pageSize ;
    this.currentPage = pageData.pageIndex + 1;
    this.deliveryService.getDeliveries(this.postPerPage,this.currentPage) ;
  }


}
