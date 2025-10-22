// Importe as funções necessárias da SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// TODO: Adicione a configuração do seu projeto Firebase aqui
const firebaseConfig = {
  apiKey: "AIzaSyBzimuo5G6XVX_0ffYDA0NenCEQ7cCh2VI",
  authDomain: "imprio-das-gramas-930665-e09b4.firebaseapp.com",
  projectId: "imprio-das-gramas-930665-e09b4",
  storageBucket: "imprio-das-gramas-930665-e09b4.firebasestorage.app",
  messagingSenderId: "77746400435",
  appId: "1:77746400435:web:e077a31b070b6b64a214c6"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte a instância do Firestore para ser usada em outros lugares
export const db = getFirestore(app);
