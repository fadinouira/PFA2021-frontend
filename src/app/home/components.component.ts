import { Component, OnInit, Renderer2 } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/auth/Services/auth.service';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    providers: [NgbCarouselConfig] ,
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `],
    styleUrls: ['comonents.component.scss']
})

   

export class ComponentsComponent implements OnInit {
    user : any ;

    constructor(config: NgbCarouselConfig, private auth : AuthService ) {
        config.interval = 5000;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
    }
    
 
   

    ngOnInit() {
      this.user = this.auth.getUser() ;
    }

}
