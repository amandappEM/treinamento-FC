// firebase-config.js
// Config do projeto Firebase "Ajustes FC - Treinamento".
// Este objeto NÃO é segredo — o que protege os dados são as regras do Firestore.
// Carregado depois dos SDKs compat (firebase-app-compat / firebase-firestore-compat).

const firebaseConfig = {
  apiKey: "AIzaSyA9bejaxtfAKCnckKhY6JKbzcKi0nQL1BY",
  authDomain: "ajustes-fc---treinamento.firebaseapp.com",
  projectId: "ajustes-fc---treinamento",
  storageBucket: "ajustes-fc---treinamento.firebasestorage.app",
  messagingSenderId: "1043649042506",
  appId: "1:1043649042506:web:11a38db72e19449a7faeb3",
  measurementId: "G-H9E75MPJ03"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
