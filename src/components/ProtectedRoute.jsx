import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";

const ProtectedRoute = ({ children }) => {
    const user = auth.currentUser;

    return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;