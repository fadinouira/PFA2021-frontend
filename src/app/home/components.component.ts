import { Component, OnInit, Renderer2 } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

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


    constructor(config: NgbCarouselConfig ) {
        config.interval = 5000;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
    }
    
 
   

    ngOnInit() {
      
    }

}
