import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageChat } from './../models/faqs.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(messageInfo: string, mail: string, subject: string) {
    console.log(messageInfo, mail, subject);
    this.http
      .post(`${environment.baseUrl}/question/sendQuestion`, {
        message: messageInfo,
        mail: mail,
        subject: subject,
      })
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }
}
