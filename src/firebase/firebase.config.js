import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // এটি অবশ্যই যোগ করতে হবে

const firebaseConfig = {
  apiKey: "AIzaSyCkPOzNHealiDZ35vm6neOFOqGHjA_W0IQ",
  authDomain: "gamehub-eaf40.firebaseapp.com",
  projectId: "gamehub-eaf40",
  storageBucket: "gamehub-eaf40.firebasestorage.app",
  messagingSenderId: "471856454302",
  appId: "1:471856454302:web:931f366385a80f2edd398f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth এক্সপোর্ট করুন যাতে AuthProvider এ ব্যবহার করা যায়
export const auth = getAuth(app);
export default app;