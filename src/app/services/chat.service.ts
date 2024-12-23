import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Client, Frame, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { DataStoreService } from './data-store.service';

export const STOMP_CLIENT = new InjectionToken<Client>('STOMP_CLIENT', {
  providedIn: 'root',
  factory: () => new Client({
    brokerURL: 'ws://localhost:9090/server1/', // Assuming your server is running on localhost:8080
    // Uncomment if you are using SockJS
    webSocketFactory: () => new SockJS('http://localhost:9090/server1'),
    reconnectDelay: 5000,
    debug:(str)=>{
          console.log(new Date(), str);
        }
  }),
});

@Injectable({
  providedIn: 'root'
})
export class ChatService {



  constructor(@Inject(STOMP_CLIENT) private stompClient: Client,private dataStore:DataStoreService){
    // this.stompClient = new Client({
    //   brokerURL: 'ws://localhost:9090/server1/websocket',
    //   webSocketFactory: ()=> SockJS("http://localhost:9090/server1"),
    //   reconnectDelay: 5000,
    //   debug:(str)=>{
    //     console.log(new Date(), str);
    //   }
    // });
  }

  public connect(){
    this.stompClient.onConnect = (frame:Frame) =>{
      console.log("Connected" + frame);

      //subscribe to topic
      console.log("Logged in user id");
      console.log(this.dataStore.loginId);
      this.stompClient.subscribe("/topic/return-to/"+this.dataStore.loginId,(message:Message)=>{
        console.log("Received Message: " + message);
        let msgBody = JSON.parse(message.body);
        this.dataStore.messages.push(
          {
            senderName:msgBody.name,
            senderId:msgBody.senderId,
            receiverId:msgBody.receiverId,
            text:msgBody.content,
            isMine:false
          }
        );
        // console.log(msgBody.content)
        return message.body;
      });
    };
    

    this.stompClient.onStompError = (frame:Frame)=>{
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();

    
  }

  public disconnect(){
    if(this.stompClient !==null){
      this.stompClient.deactivate();
    }
    console.log("Disconnected");
  }


  public sendMessage(destination: string, body: any){
    this.stompClient.publish(
      {destination: destination,  body: JSON.stringify(body)}
    );

  }
}
