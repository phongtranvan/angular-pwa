import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { firebaseConfig } from './app/firebase.config';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideServiceWorker, SwUpdate } from '@angular/service-worker';
import { environment } from './environments/environment';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/angular-pwa/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideRouter([
      // your routes here
    ]),
    provideMessaging(() => getMessaging()),
    provideServiceWorker('ngsw-worker.js', { enabled: environment.production })
  ]
}).catch(err => console.error(err));