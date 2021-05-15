import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';



import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ExamplesModule } from './examples/examples.module';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/Services/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoaderComponent } from './animations/loader/loader.component';
import { MessagesComponent } from './notifications/messages/messages.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { MessagesService } from './notifications/services/messages.service';
import { WebSocketService } from './notifications/services/web-socket.service';
import { AddItemComponent } from './items/add-item/add-item.component';
import { CommonModule } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComponentsComponent } from './deliveries/components.component';
import { DeliveriesSectionComponent } from './deliveries/deliveries-section/deliveries-section.component';
import { AddDelivComponent } from './deliveries/add-deliv/add-deliv.component';
import { DeliveryComponent } from './deliveries/delivery/delivery.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    LoaderComponent,
    MessagesComponent,
    NotificationsComponent,
    AddItemComponent,
    ComponentsComponent,
    DeliveriesSectionComponent,
    AddDelivComponent,
    DeliveryComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    NouisliderModule,
    JwBootstrapSwitchNg2Module,
    MatPaginatorModule,  
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},MessagesService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
