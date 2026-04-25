import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(undefined); // 🔥 undefined = loading

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });

        return () => unsubscribe();
    }, []);

    // 🔥 Show loader while checking auth
    if (user === undefined) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Checking authentication...</p>
            </div>
        );
    }

    // 🔐 Redirect if not logged in
    return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;