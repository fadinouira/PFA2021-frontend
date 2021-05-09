import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ComponentsComponent } from './components.component';
import { DeliveriesSectionComponent } from './deliveries-section/deliveries-section.component';
import { AddDelivComponent } from './add-deliv/add-deliv.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        MatPaginatorModule,        
    ],
    declarations: [
        ComponentsComponent,
        DeliveriesSectionComponent,
        AddDelivComponent
    ],
    entryComponents: [],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
