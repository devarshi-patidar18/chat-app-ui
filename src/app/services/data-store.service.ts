import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }

  loginId:number = 0;
  loginUser:string = "";
  // receiverName:string = "";
  receiverId:number = 0;

  messages:any = [
    // { text: 'Hello!', isMine: true },
    // { text: 'Hi there!', isMine: false }
  ];

  getReceiverName(receiverId){
    if(receiverId==1){
      return "Devarshi";
    }
    if(receiverId==2){
      return "Muskan";
    }
    if(receiverId==3){
      return "Maya";
    }
    else{
      return "Incorrect details";
    }
  }
}
