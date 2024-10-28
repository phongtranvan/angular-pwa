importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBdDdEhlpK1tjrnLvSROZxn6uINFOt46hk",

  authDomain: "pwa-pr-e83ed.firebaseapp.com",

  projectId: "pwa-pr-e83ed",

  storageBucket: "pwa-pr-e83ed.appspot.com",

  messagingSenderId: "134776460866",

  appId: "1:134776460866:web:cbbc8c4c185931ad8f3fdb",

  measurementId: "G-VVX1K48NK6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});