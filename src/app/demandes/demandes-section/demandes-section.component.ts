import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'app/auth/Services/auth.service';
import { Subscription } from 'rxjs';
import { Demande } from '../services/demande.model';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demandes-section',
  templateUrl: './demandes-section.component.html',
  styleUrls: ['./demandes-section.component.scss']
})
export class DemandesSectionComponent implements OnInit {
  demandes : Demande[] = [];
  private demandesSub: Subscription;
  private maxDemandesSub: Subscription;
  private userAuthSub : Subscription;
  public isLoading : boolean;
  totalDemandes : number;
  postPerPage = 8;
  pageSizeOption = [8,16,32,64];
  currentPage = 1;
  userLogedIn = this.auth.getAuthStatus();
  owner : any;
  constructor(public demandeService : DemandeService, private auth : AuthService) { }

  ngOnInit(): void {
    this.demandeService.getDemandes(this.postPerPage,this.currentPage) ;
    this.isLoading = true;
    this.demandesSub = this.demandeService.getDemandesListener()
    .subscribe((demandes : Demande[]) => {
      this.demandes = demandes ;
      console.log(demandes);
      this.isLoading = false;
    });
    this.maxDemandesSub = this.demandeService.getMaxDemandesListener()
    .subscribe((totalDeliveries : number) => {
      this.totalDemandes = totalDeliveries ;
    });
    this.userAuthSub = this.auth.getAuthStatesListener().subscribe(result => {
      this.userLogedIn = result ;
    });

  }

  ngOnDestroy(): void {
    this.demandesSub.unsubscribe();
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
    this.demandeService.getDemandes(this.postPerPage,this.currentPage) ;
  }
}
