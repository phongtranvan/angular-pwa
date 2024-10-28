import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => { 
          alert('Permission granted! Save to the server!' + token); },
        (error) => { console.error(error); },
      );
  }

  receiveMessage() {
    this.afMessaging.messages
      .subscribe((message) => { console.log('Message received. ', message); 


      });
  }
}