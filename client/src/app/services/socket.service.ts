import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {io} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io(`http://localhost:3000/` ,{
    withCredentials:true,
    extraHeaders: {
      "my-custom-header": "abcd"
    },
    autoConnect:true,
  });

  constructor() {
    this.io.emit("test","HOLA MUNDO");
    this.io.on("test2",(text:string)=>{
      alert(text)
    })
   }
}
