import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from './../../services/chat.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Faqs } from './../../models/faqs.interface';
import { Component, OnInit } from '@angular/core';
import { FAQS } from 'src/app/models/faqs.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chat: boolean = false;
  faqs: Faqs[] = FAQS;
  answer: number;
  allowInput: boolean = true;
  dbProfile: any;

  formMail!: FormGroup;

  initForm(): FormGroup {
    return this.fb.group({
      subject: [''],
      message: [''],
    });
  }

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private readonly fb: FormBuilder,
    public _chat: ChatService
  ) {}

  ngOnInit(): void {
    this.formMail = this.initForm();
    this._auth.user$.subscribe((profile) => {
      this.dbProfile = profile;
      console.log(profile);
    });
  }
  sendMessage() {
    this._chat.sendMessage(
      this.formMail.value.message,
      this.dbProfile.email,
      this.formMail.value.subject
    );
    this.formMail.get('message')?.setValue('');
    this.formMail.get('subject')?.setValue('');
    Swal.fire({
      icon: 'success',
      title: 'We send your question to rentten2022@gmail.com',
      text: 'Pronto recibira la respuesta a traves del mail',
    });
  }
  showChat() {
    this.chat = !this.chat;
  }

  showAnswer(i: number) {
    this.answer = i;
    if (this.faqs[i].response === '') {
      if (this.dbProfile === null) {
        Swal.fire({
          title: 'You must be user to send us a message',
          text: 'Do you want to register?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Yes I want to register',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this._auth.loginWithRedirect();
          }
        });
      } else {
        this.allowInput = false;
      }
    } else {
      this.allowInput = true;
    }
  }
}
