import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';


interface Message{
  text:string;
  messageType:number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chats:Message[] = [];


  constructor(
    private socket:SocketService
  ) {
    this.onReceiveMessage()
   }

  sendMessage(messageInfo:Message){
    //this.chats.push(messageInfo)
    this.socket.io.emit("sendMessage", messageInfo)
  }

  onReceiveMessage(){
    this.socket.io.on('receiveMessage',(messageInfo)=>{
      console.log(messageInfo);
      messageInfo.messageType = 2;

      this.chats.push(messageInfo)
    })
  }
}
