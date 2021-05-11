import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/Services/auth.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Delivery } from './delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveries : Delivery[] = [] ;
  private deliveriesUpdated = new Subject<Delivery[]>();

  private delivery : any = null ;
  private deliveryUpdated = new Subject<any>();

  private maxDeliveries : number ;
  private maxDeliveriesUpdated = new Subject<number>();

  private token ;
  private url = 'http://localhost:3200';

  constructor(private http : HttpClient, private router : Router,private auth :AuthService){}

  getDeliveries(pageSize : number , currentPage : number) {
    const queryParams = "?pageSize="+pageSize+"&currentPage="+currentPage;
    this.http.get<{message : String , deliveries : any ,maxPages : number}>(this.url+'/api/deliveries'+ queryParams)
    .pipe(map((postData) => {
      return {
        maxPages : postData.maxPages ,
        deliveries : postData.deliveries.map(delivery => {
        return {
          id : delivery._id ,
          owner : delivery.owner,
          ownerPhoto : delivery.ownerPhoto,
          ownerPhone : delivery.ownerPhone,
          ownerEmail : delivery.ownerEmail,
          name : delivery.ownerName, 
          originAddress :delivery.originAddress,
          deliveryAddress : delivery.deliveryAddress,
          expectedArrivalDate : new Date(delivery.expectedArrivalDate),
          onRoad : delivery.onRoad,
          onDestination : delivery.onDestination
        }
      })};
    }))
    .subscribe((deliveries)=>{
      console.log(deliveries);
      this.deliveries = deliveries.deliveries ;
      this.deliveriesUpdated.next([...this.deliveries]);
      this.maxDeliveries = deliveries.maxPages ;
      this.maxDeliveriesUpdated.next(this.maxDeliveries);
    });

  }

  getDeliveriesListener(){
    return this.deliveriesUpdated.asObservable();
  }

  getMaxDeliveriesListener(){
    return this.maxDeliveriesUpdated.asObservable();
  }

  addDelivery(deliv : Delivery ){
    console.log(deliv);
    this.http.post<{message : string,delivery : Delivery }>('http://localhost:3200/api/deliveries', deliv)
    .subscribe((response)=>{
      console.log(response.message);
      const delivery = response.delivery ;
      this.deliveries.push(delivery);
      this.deliveriesUpdated.next([...this.deliveries]);
      this.router.navigate(["/"]);
    });
  }

  getOne(id : string) {
    this.http.get<{message : string,delivery : any}>(this.url + '/api/deliveries/'+id)
      .subscribe(response =>{
        this.delivery =  response.delivery ;
        this.deliveryUpdated.next(this.delivery);
      });
    }

  getDeliveryListener(){
    return this.deliveryUpdated.asObservable();
  }

}
