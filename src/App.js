import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute"; // 🔥 import

function App() {
  return (
    <div>
      <Routes>

        {/* Public Route */}
        <Route path="/auth" element={<Auth />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trip/:id"
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App; 