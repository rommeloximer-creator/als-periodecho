// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCgvnHGxu_G5euXHrIoov07GxS08CtvG4Y",
    authDomain: "als-periodecho.firebaseapp.com",
    projectId: "als-periodecho",
    storageBucket: "als-periodecho.firebasestorage.app",
    messagingSenderId: "969937604443",
    appId: "1:969937604443:web:fead3fe0aa71a6f2d7147e"
};

// Initialize only once and export the services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);