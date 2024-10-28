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
  fcmToken: string | null = null;

  constructor() {
    // 
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this.requestPermission();
      } else {
        alert('Notification permission denied.');
      }
    });
    this.listen();
  }

  requestPermission() {
    navigator.serviceWorker.register('/angular-pwa/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service worker registered:', registration);

        // Get token with the correct service worker registration
        return getToken(this.messaging, {
          vapidKey: 'BAz0NFNMkfBFtvxNBwBS7O1XBzn9ordyRHDFUVwQSWTjznW1N4-fGH3qAWAdNpVr7B6vqmXGBxKD9-fNw1JlpPg',
          serviceWorkerRegistration: registration
        });
      })
      .then((token) => {
        this.fcmToken = token;
        console.log('FCM Token received:', token);
        // Send token to the server or store it as needed
      })
      .catch((err) => {
        alert('Error retrieving FCM token or registering service worker: ' + err);
        console.error('Error retrieving FCM token or registering service worker:', err);
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