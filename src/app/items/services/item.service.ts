import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/Services/auth.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items : Item[] = [] ;
  private itemsUpdated = new Subject<Item[]>();

  requestedItems : Item[] = [];
  requestedItemsUpdated = new Subject<Item[]>();


  private item : Item = null ;
  private itemUpdated = new Subject<Item>();

  private url = 'http://localhost:3200';

  constructor(private http : HttpClient, private router : Router,private auth :AuthService){}

//   getDeliveries(pageSize : number , currentPage : number) {
//     const queryParams = "?pageSize="+pageSize+"&currentPage="+currentPage;
//     this.http.get<{message : String , deliveries : any ,maxPages : number}>(this.url+'/api/deliveries'+ queryParams)
//     .pipe(map((postData) => {
//       return {
//         maxPages : postData.maxPages ,
//         deliveries : postData.deliveries.map(delivery => {
//         return {
//           id : delivery._id ,
//           owner : delivery.owner,
//           ownerPhoto : delivery.ownerPhoto,
//           ownerPhone : delivery.ownerPhone,
//           ownerEmail : delivery.ownerEmail,
//           name : delivery.ownerName, 
//           originAddress :delivery.originAddress,
//           deliveryAddress : delivery.deliveryAddress,
//           expectedArrivalDate : new Date(delivery.expectedArrivalDate),
//           onRoad : delivery.onRoad,
//           onDestination : delivery.onDestination
//         }
//       })};
//     }))
//     .subscribe((deliveries)=>{
//       console.log(deliveries);
//       this.deliveries = deliveries.deliveries ;
//       this.deliveriesUpdated.next([...this.deliveries]);
//       this.maxDeliveries = deliveries.maxPages ;
//       this.maxDeliveriesUpdated.next(this.maxDeliveries);
//     });

//   }

  addItem(item : Item ,id : string){
    console.log(item);
    this.http.post<{message : string,item : Item }>(this.url+'/api/items', item)
    .subscribe((response)=>{
      const item = response.item ;
      this.items.push(item);
      this.itemsUpdated.next([...this.items]);
      let request : string = this.url+'/api/deliveries/addItem/' + id ;
      this.http.put<{message : string}>(request,{"item" : item.id})
      .subscribe((result)=>{
        console.log(result.message);
        this.router.navigate(['/delivery/',id]);
      });
    });
  }

  addExistedItem(itemId : string , id : string ){
    let request : string = this.url+'/api/deliveries/addItem/' + id ;
    this.http.put<{message : string}>(request,{"item" : itemId})
      .subscribe((result)=>{
        console.log(result.message);
        this.router.navigate(['/delivery/',id]);
      });
  }

  getUserItem(){
    this.http.get<{message : string,items : any}>(this.url + '/api/items/')
        .pipe(
            map((result) => {
                return {
                    message : result.message ,
                    items : result.items.map(item => {
                    return {
                    id : item._id,
                    owner : item.owner,
                    name : item.name,
                    status : item.status,
                    weight : item.weight
                }
            })};
        }))
        .subscribe((result)=>{
            console.log(result.message);
            this.items = result.items ;
            this.itemsUpdated.next(this.items);

          });
  }

  getOneItem(id : string){
    this.http.get<{message : string,item : any}>(this.url + '/api/items/'+id)
        .pipe(
            map((result) => {
                return {
                    message : result.message ,
                    item : {
                      id : result.item._id,
                      owner : result.item.owner,
                      name : result.item.name,
                      status : result.item.status,
                      weight : result.item.weight
                    }
            };
        }))
        .subscribe((result)=>{
            let item : Item = result.item ;
            this.requestedItems.push(item) ;
            this.requestedItemsUpdated.next(this.requestedItems);
          });
  }

  getRequestedItems(ids : string[]){
    this.clearRequestedItems();
    ids.forEach(id => {
      this.getOneItem(id);
    });

  }

  clearRequestedItems(){
    let i = 0 ;
    console.log(this.requestedItems);
    this.requestedItems.forEach(element => {
      this.requestedItems.pop(); 
      i++;
      console.log(i);
    }); 
    let items : Item[] = [] ;
    this.requestedItemsUpdated = new Subject<Item[]>()
    this.requestedItemsUpdated.next(items);
    console.log(this.requestedItems);


  }

  getRequestedItemsListener(){
    return this.requestedItemsUpdated.asObservable();
  }


  getItemsistener(){
    return this.itemsUpdated.asObservable();
  }
}

//   getOne(id : string) {
//     this.http.get<{message : string,delivery : any}>(this.url + '/api/deliveries/'+id)
//       .subscribe(response =>{
//         this.delivery =  {
//           id : response.delivery._id ,
//           owner : response.delivery.owner,
//           ownerPhoto : response.delivery.ownerPhoto,
//           ownerPhone : response.delivery.ownerPhone,
//           ownerEmail : response.delivery.ownerEmail,
//           ownerName : response.delivery.ownerName, 
//           originAddress : response.delivery.originAddress,
//           deliveryAddress : response.delivery.deliveryAddress,
//           departDate : new Date(response.delivery.departDate),
//           expectedArrivalDate : new Date(response.delivery.expectedArrivalDate),
//           onRoad : response.delivery.onRoad,
//           onDestination : response.delivery.onDestination,
//           acceptedItems : response.delivery.acceptedItems,
//           listedItems : response.delivery.listedItems,
//         } ;
//         this.deliveryUpdated.next(this.delivery);
//       });
//     }


