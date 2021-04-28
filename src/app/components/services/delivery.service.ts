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
  private maxDeliveries : number ;
  private maxDeliveriesUpdated = new Subject<number>();
  private token ;
  constructor(private http : HttpClient, private router : Router,private auth :AuthService){}

  getDeliveries(pageSize : number , currentPage : number) {
    const queryParams = "?pageSize="+pageSize+"&currentPage="+currentPage;
    this.http.get<{message : String , deliveries : any ,maxPages : number}>('https://livkoli-server.herokuapp.com/api/deliveries'+ queryParams)
    .pipe(map((postData) => {
      return {
        maxPages : postData.maxPages ,
        deliveries : postData.deliveries.map(delivery => {
        return {
          id : delivery.id ,
          owner : delivery.owner,
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

  // deletePost(id :string) {
  //   this.http.delete<{message : string}>('http://localhost:3200/api/posts/'+id)
  //   .subscribe((res)=>{
  //     console.log(res.message);
  //     this.posts = this.posts.filter(post => post.id !== id);
  //     this.postsUpdated.next([...this.posts]);
  //   });
  //   console.log()
  // }

  // getPost(id: string) {
  //   const post = {...this.posts.find(p => p.id == id)};
  //   console.log("this is the post");
  //   console.log(post);
  //   return post ;
  // }

  // updatePost(post : Post,image : File | string){
  //   let postData : Post | FormData ;
  //   if(typeof(image) == 'object') {
  //     console.log("post data is image");
  //     postData = new FormData();
  //     postData.append("title" , post.title);
  //     postData.append("content" , post.content);
  //     postData.append("image" , image , post.title);
  //     console.log("this is the post data");
  //     console.log(postData);
  //   }
  //   else {
  //     console.log("post data is a string");
  //     postData  = {
  //       id : post.id,
  //       title : post.title,
  //       content : post.content,
  //       imagePath : image
  //     }
  //   }
  //   console.log("this is the post data");
  //   console.log(postData);
  //   var id : string  ;
  //   id = post.id ;
  //   this.http.put<{message : string}>('http://localhost:3200/api/posts/'+ id,postData)
  //   .subscribe((res) => {
  //     console.log(res.message);
  //     this.getPosts(5,1);
  //     this.router.navigate(["/"]);
  //   })
  // }

  // addPost(post : Post , image : File){
  //   const postData = new FormData();
  //   postData.append("title" , post.title);
  //   postData.append("content" , post.content);
  //   postData.append("image" , image , post.title);
  //   this.http.post<{message : string,post : Post }>('http://localhost:3200/api/posts', postData)
  //   .subscribe((response)=>{
  //     console.log(response.message);
  //     console.log(response.post.imagePath);
  //     this.getPosts(5,1);
  //     post = response.post ;
  //     this.posts.push(post);
  //     this.postsUpdated.next([...this.posts]);
  //     this.router.navigate(["/"]);
  //   });

  // }

}
