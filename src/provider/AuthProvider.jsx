import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  GoogleAuthProvider // এটি অবশ্যই লাগবে
} from "firebase/auth";
import { auth } from "../firebase/firebase.config"; // নিশ্চিত করুন পাথ সঠিক আছে

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // গুগল প্রোভাইডার সেটআপ
  const googleProvider = new GoogleAuthProvider();

  // ১. নতুন ইউজার তৈরি (ইমেইল/পাসওয়ার্ড)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ২. লগইন (ইমেইল/পাসওয়ার্ড)
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ৩. গুগল লগইন/রেজিস্ট্রেশন (একই ফাংশন দুই কাজই করবে)
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ৪. লগআউট
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ইউজারের স্টেট পর্যবেক্ষণ করা (Observer)
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;