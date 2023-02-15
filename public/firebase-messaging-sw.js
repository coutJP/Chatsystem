importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBsE2xQyXKyUpzT51FYKoLJdABJfoE4RuI",
  authDomain: "chat2-e1a61.firebaseapp.com",
  projectId: "chat2-e1a61",
  storageBucket: "chat2-e1a61.appspot.com",
  messagingSenderId: "970933226874",
  appId: "1:970933226874:web:f30574ef6f2a23eb891ac3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
console.log("hi")
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});