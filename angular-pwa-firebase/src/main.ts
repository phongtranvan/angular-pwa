import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { firebaseConfig } from './app/firebase.config';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideServiceWorker, SwUpdate } from '@angular/service-worker';
import { environment } from './environments/environment';

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