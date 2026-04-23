import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/"); // already logged in
    }
  });

  return () => unsubscribe();
}, []);

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        // alert("Login successful");
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-500 mt-3 cursor-pointer"
        >
          {isLogin ? "Create account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
};

export default Auth;