// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyAk87MZomVjWf3H0l8A03zel2-Ru_5xlt0",
  authDomain: "med-a-sync.firebaseapp.com",
  projectId: "med-a-sync",
  storageBucket: "med-a-sync.appspot.com",
  messagingSenderId: "858646205376",
  appId: "1:858646205376:web:616bbd3d665ca35a6d6e25",
  measurementId: "G-8QTJS22X97"
};

firebase.initializeApp(firebaseConfig);

// Make Firestore available globally
window.db = firebase.firestore();
