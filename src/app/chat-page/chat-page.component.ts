import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Client, Frame, Message } from '@stomp/stompjs';
import { FormsModule } from '@angular/forms';
import { DataStoreService } from '../services/data-store.service';


@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [FormsModule],
  providers:[Client],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

  message:string = "";
  sendto:string = "";
  sendfrom:string = "";

  // messages = [
    
  // ];

  constructor(private chatService:ChatService,public dataStore:DataStoreService){}

  // messages:any = [];

  ngOnInit(): void {

    let msg:any = this.chatService.connect();
    console.log("Working " + msg);
    // this.messages.push(msg);
    

  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage(msg){
    // console.log(this.message);
    console.log(this.dataStore.receiverId);
    let body:any ={
      // name:"Devarshi",
      content: msg,
      senderId:this.dataStore.loginId,
      receiverId:this.dataStore.receiverId
    }
    this.chatService.sendMessage("/app/message",body);
    this.dataStore.messages.push({
      text:body.content,
      isMine:true
    })
  }

  sendMessage1(event){

  }

  

}
