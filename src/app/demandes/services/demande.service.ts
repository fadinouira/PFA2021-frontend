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

  getOne(id : string) {
    this.http.get<{message : string,demande : any}>(this.url + '/api/demandes/'+id)
      .subscribe(res =>{
        console.log(res);
        this.demande =  {
          id : res.demande._id ,
          owner : res.demande.owner,
          ownerName : res.demande.ownerName, 
          ownerPhoto : res.demande.ownerPhoto,
          ownerPhone : res.demande.ownerPhone,
          ownerEmail : res.demande.ownerEmail,
          originAddress : res.demande.originAddress ,
          deliveryAddress :  res.demande.deliveryAddress ,
          wantedArrivalDate : new Date(res.demande.wantedArrivalDate),
          item : res.demande.item ,
          itemShipped :  res.demande.itemShipped ,
          itemDelivered :  res.demande.itemDelivered ,
          provider: res.demande.provider ,
          listedProviders : res.demande.listedProviders 
        } ;
        this.demandeUpdated.next(this.demande);
      });
  }

  getDemandeListener(){
    return this.demandeUpdated.asObservable();
  }

  request(id : string) {
    this.http.get<{message : string}>('http://localhost:3200/api/demandes/takeJob/'+id)
    .subscribe((response)=>{
      console.log(response.message);
    });
  }

  accept(id : string ,transporter : string,item : string) {
    this.http.put<{message : string}>('http://localhost:3200/api/demandes/acceptJob/'+id , {"provider" : transporter, "item" : item})
    .subscribe((response)=>{
      console.log(response.message);
    });
  }

}
