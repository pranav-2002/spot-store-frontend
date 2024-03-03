// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmW3sF-j4y0iy_BEBxQdQ1Go2BZz9f7wY",
  authDomain: "spot-store-37a5a.firebaseapp.com",
  projectId: "spot-store-37a5a",
  storageBucket: "spot-store-37a5a.appspot.com",
  messagingSenderId: "585354383412",
  appId: "1:585354383412:web:adc735d2d921c16713fa61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firebase storage reference
const storage = getStorage(app);
export default storage;
