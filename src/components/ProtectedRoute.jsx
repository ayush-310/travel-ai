import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const user = useAuth();

    // 🔥 Wait for Firebase to restore session
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