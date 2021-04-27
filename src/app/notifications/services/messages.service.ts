import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  socket : any ;
  readonly url : string = "http://localhost:3200";

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebSocketService) {
    this.messages = <Subject<any>> this.wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }


  
}
