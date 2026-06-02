// firebase-config.js
// Cole aqui a config do MESMO projeto Firebase do Quiz do Clube.
// (No console do Firebase: Configurações do projeto > Seus apps > SDK config)
// Este objeto NÃO é segredo — o que protege os dados são as regras do Firestore.

const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI.firebaseapp.com",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
