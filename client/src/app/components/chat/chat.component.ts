import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';


interface Message{
  text:string;
  messageType:number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatDiv:boolean=false;
  text:string=""

  constructor(
    public chat:ChatService
  ) { }

  ngOnInit(): void {
  }

  sendMessage(){
    let messageInfo={
      text:this.text,
      messageType:1
    };

    this.chat.sendMessage(messageInfo)
    this.text=""

  }

  showChat(){
    this.chatDiv= !this.chatDiv
  }
}
