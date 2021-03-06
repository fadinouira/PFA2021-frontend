import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { LandingComponent } from './examples/landing/landing.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { MessagesComponent } from './notifications/messages/messages.component';

import { AuthGuard } from './auth/Services/auth.guard';

import { AddDelivComponent } from "./components/add-deliv/add-deliv.component";

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent , canActivate:[AuthGuard]},
    { path: 'landing',          component: LandingComponent },
    { path: 'messages',          component: MessagesComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'signin',           component: SigninComponent },
    { path: 'add-deliv',        component: AddDelivComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
