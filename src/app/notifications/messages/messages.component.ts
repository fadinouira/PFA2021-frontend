import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  message : string ;
  messages : Array<string> = new Array<string>() ;
  constructor(private msg : MessagesService) { }

  ngOnInit(): void {
    //connect and listen to socket server
    this.msg.messages.subscribe(msg => {
      this.message = msg.text ;
      this.messages.push(this.message);
    }) ;
  }





}
