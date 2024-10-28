import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pwa-firebase';
  private messaging = inject(Messaging);

  constructor() {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    getToken(this.messaging, { vapidKey: 'BAz0NFNMkfBFtvxNBwBS7O1XBzn9ordyRHDFUVwQSWTjznW1N4-fGH3qAWAdNpVr7B6vqmXGBxKD9-fNw1JlpPg' }).then(
      (currentToken) => {
        if (currentToken) {
          console.log('Got FCM token:', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // Check if the browser supports notifications
      if ('Notification' in window) {
        // Request permission if not already granted
        if (Notification.permission === 'granted') {
          this.showNotification(payload);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              this.showNotification(payload);
            }
          });
        }
      }
    });
  }

  showNotification(payload: any) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    };
    new Notification(notificationTitle, notificationOptions);
  }
}