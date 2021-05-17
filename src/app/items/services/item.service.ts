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
  private requestedItemsUpdated = new Subject<Item[]>();


  acceptedItems : Item[] = [];
  private acceptedItemsUpdated = new Subject<Item[]>();



  private item : Item = null ;
  private itemUpdated = new Subject<Item>();

  private url = 'http://localhost:3200';

  constructor(private http : HttpClient, private router : Router,private auth :AuthService){}

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

  acceptRequestedItem(itemId : string , delivId : string) {
    console.log("deliv id:"+ delivId);
    let request : string = this.url+'/api/deliveries/acceptItem/' + delivId ;
      this.http.put<{message : string}>(request,{"item" : itemId})
      .subscribe((result)=>{
        console.log(result.message);
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
                      ownerName : result.item.ownerName,
                      ownerPhoto : result.item.ownerPhoto,
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
    this.requestedItems = [];


  }

  getRequestedItemsList(){
    return this.requestedItems;
  }

  //accepted items
  getAcceptedItems(ids : string[]){
    this.clearAcceptedItems();
    ids.forEach(id => {
      this.getOneAcceptedItem(id);
    });
  }

  getOneAcceptedItem(id : string){
    this.http.get<{message : string,item : any}>(this.url + '/api/items/'+id)
        .pipe(
            map((result) => {
                return {
                    message : result.message ,
                    item : {
                      id : result.item._id,
                      owner : result.item.owner,
                      ownerName : result.item.ownerName,
                      ownerPhoto : result.item.ownerPhoto,
                      name : result.item.name,
                      status : result.item.status,
                      weight : result.item.weight
                    }
            };
        }))
        .subscribe((result)=>{
            let item : Item = result.item ;
            this.acceptedItems.push(item) ;
            this.acceptedItemsUpdated.next(this.acceptedItems);
          });
  }

  clearAcceptedItems(){
    this.acceptedItems = [];
  }

  getAcceptedItemsList(){
    return this.acceptedItems;
  }

  getItemsistener(){
    return this.itemsUpdated.asObservable();
  }
}