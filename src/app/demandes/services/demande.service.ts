import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/Services/auth.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Demande } from './demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private demandes : Demande[] = [] ;
  private demandesUpdated = new Subject<Demande[]>();

  private demande : Demande = null ;
  private demandeUpdated = new Subject<Demande>();

  private maxDemandes : number ;
  private maxDemandesUpdated = new Subject<number>();

  private url = 'http://localhost:3200';

  constructor(private http : HttpClient, private router : Router,private auth :AuthService){}

  getDemandes(pageSize : number , currentPage : number) {
    const queryParams = "?pageSize="+pageSize+"&currentPage="+currentPage;
    this.http.get<{message : String , demandes : any ,maxPages : number}>(this.url+'/api/demandes'+ queryParams)
    .pipe(map((data) => {
      return {
        maxPages : data.maxPages ,
        demandes : data.demandes.map(demande => {
        return {
          id : demande._id ,
          owner : demande.owner,
          ownerName : demande.ownerName, 
          ownerPhoto : demande.ownerPhoto,
          ownerPhone : demande.ownerPhone,
          ownerEmail : demande.ownerEmail,
          originAddress : demande.originAddress ,
          deliveryAddress :  demande.deliveryAddress ,
          wantedArrivalDate : new Date(demande.wantedArrivalDate),
          item : demande.item ,
          itemShipped :  demande.itemShipped ,
          itemDelivered :  demande.itemDelivered ,
          provider:  demande.provider ,
          listedProviders :  demande.listedProviders 
        }
      })};
    }))
    .subscribe((result)=>{
      console.log(result);
      this.demandes = result.demandes ;
      this.demandesUpdated.next([...this.demandes]);
      this.maxDemandes = result.maxPages ;
      this.maxDemandesUpdated.next(this.maxDemandes);
    });

  }

  getDemandesListener(){
    return this.demandesUpdated.asObservable();
  }

  getMaxDemandesListener(){
    return this.maxDemandesUpdated.asObservable();
  }

  addDemande(demande : Demande ){
    console.log(demande);
    this.http.post<{message : string,demande : Demande }>('http://localhost:3200/api/demandes', demande)
    .subscribe((response)=>{
      console.log(response.message);
      const demande = response.demande ;
      this.demandes.push(demande);
      this.demandesUpdated.next([...this.demandes]);
      this.router.navigate(["/"]);
    });
  }

  // getOne(id : string) {
  //   this.http.get<{message : string,demande : any}>(this.url + '/api/deliveries/'+id)
  //     .subscribe(response =>{
  //       this.demande =  {
  //         id : response.demande._id ,
  //         owner : response.demande.owner,
  //         ownerPhoto : response.demande.ownerPhoto,
  //         ownerPhone : response.demande.ownerPhone,
  //         ownerEmail : response.demande.ownerEmail,
  //         ownerName : response.demande.ownerName, 
  //         originAddress : response.demande.originAddress,
  //         deliveryAddress : response.demande.deliveryAddress,
  //         departDate : new Date(response.demande.departDate),
  //         expectedArrivalDate : new Date(response.demande.expectedArrivalDate),
  //         onRoad : response.demande.onRoad,
  //         onDestination : response.demande.onDestination,
  //         acceptedItems : response.demande.acceptedItems,
  //         listedItems : response.demande.listedItems,
  //       } ;
  //       this.demandeUpdated.next(this.demande);
  //     });
  //   }

  // getDemandeListener(){
  //   return this.demandeUpdated.asObservable();
  // }

  // onRoad(id : string,req :any){
  //   this.http.put<{message : string}>(this.url + '/api/deliveries/onRoad/'+id,req)
  //     .subscribe(response =>{
  //       console.log(response.message);
  //     });
  // }

}
