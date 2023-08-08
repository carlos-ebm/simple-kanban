// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID",
//     measurementId: "YOUR_MEASUREMENT_ID",
// };

// Configuración de Firebase (No utilizar porque la borraré pronto)
const firebaseConfig = {
    apiKey: "AIzaSyAVwtgTa5w1-drfBUcT3ziqFcdGXXA6Qrw",
    authDomain: "kanban-board-1359f.firebaseapp.com",
    projectId: "kanban-board-1359f",
    storageBucket: "kanban-board-1359f.appspot.com",
    messagingSenderId: "217413368086",
    appId: "1:217413368086:web:1a92fe6a9ccf25d8a43837",
    measurementId: "G-K56ZTQS0E9",
};

// Inicializar la aplicación y obtener la instancia de Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
