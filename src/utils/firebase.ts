// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2bI_d_5uIbF6k_nF438oDwOFt4x4Bx0g",
  authDomain: "bloggerist-15a01.firebaseapp.com",
  databaseURL:
    "https://bloggerist-15a01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bloggerist-15a01",
  storageBucket: "bloggerist-15a01.appspot.com",
  messagingSenderId: "225100950218",
  appId: "1:225100950218:web:6474bdd736d63c4312e233",
  measurementId: "G-Z8SDQ9QY5M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };
