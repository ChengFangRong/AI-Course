// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generation-469dc.firebaseapp.com",
  projectId: "ai-course-generation-469dc",
  storageBucket: "ai-course-generation-469dc.firebasestorage.app",
  messagingSenderId: "66641892741",
  appId: "1:66641892741:web:24b2b98afe11a35376e0ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);