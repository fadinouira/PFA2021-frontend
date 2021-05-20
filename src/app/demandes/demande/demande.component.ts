import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/Services/auth.service';
import { DeliveryService } from 'app/deliveries/services/delivery.service';
import { Item } from 'app/items/services/item.model';
import { ItemService } from 'app/items/services/item.service';
import { Subscription } from 'rxjs';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {
  id : string ;
  demande : any ;
  private demandeSub: Subscription;

  listedProviders : any = [];

  isLoading : boolean ;

  item : Item;
  private itemSub: Subscription;


  users : any ;
  private usersSub : Subscription;

  connectedUser ;

  owner : boolean ;


  constructor(private activatedRoute: ActivatedRoute, private demandeService : DemandeService, private itemsService : ItemService , private auth : AuthService) { }

  ngOnInit(): void {
    this.connectedUser = this.auth.getUser();
    this.isLoading = true ;
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.demandeService.getOne(params['id']);
      
    });

    this.demandeSub = this.demandeService.getDemandeListener()
    .subscribe((demande :any) => {
      if(demande.ownerEmail == this.connectedUser.email) {
        this.owner = true ;
      }
      console.log(demande);
      this.itemsService.getOneItem(demande.item);
      this.demande = demande ;
      this.listedProviders = this.auth.getUsers(this.demande.listedProviders);
      this.isLoading = false ;
    });

    this.itemSub = this.itemsService.getItemListener()
      .subscribe((item)=> {
        this.item = item ;
      });

    this.usersSub = this.auth.getUsersListener()
      .subscribe((users) => {
        this.users = users ;
      });
  }

  ngOnDestroy() {
    this.id = null ;
    this.demande = null ;
    this.demandeSub.unsubscribe() ;
    this.usersSub.unsubscribe();
    this.itemSub.unsubscribe();

    this.isLoading = null ;
    this.item = null ;
  }

  getDelivery(id : string) {
    this.demandeService.getOne(id);
  }

  onAcceptItem(id : string) {
    this.itemsService.acceptRequestedItem(id , this.id);
    //this.acceptedItems = this.itemsdemandeService.getAcceptedItems(this.delivery.);
  }

  onRequest() {
    this.demandeService.request(this.id);
  }

  onAccept(transporter : string) {
    this.demandeService.accept(this.id,transporter,this.demande.item) ;
  }
  

}



