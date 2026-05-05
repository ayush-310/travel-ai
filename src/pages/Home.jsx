import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { subscribeToTrips } from "../services/firestoreService";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/auth");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        // undefined = Firebase still restoring session — wait, don't do anything yet
        if (user === undefined) return;

        // null = confirmed logged out
        if (user === null) {
            setTrips([]);
            setLoading(false);
            return;
        }

        // user object = logged in, subscribe to their trips
        const unsubscribe = subscribeToTrips(user.uid, (data) => {
            setTrips(data);
            setLoading(false);
        });

        return () => unsubscribe && unsubscribe();
    }, [user]);

    if (user === undefined || loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Trips ✈️</h1>
                        <p className="text-sm text-gray-500">Plan, organize and explore your journeys</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/create", { state: { loadDraft: false } })}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                        >
                            ➕ Create
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {trips.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <p className="text-gray-600 text-lg font-medium">No trips yet ✈️</p>
                        <p className="text-gray-400 text-sm mt-2">Start planning your next adventure 🌍</p>
                        <button
                            onClick={() => navigate("/create", { state: { loadDraft: false } })}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Create Your First Trip
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                onClick={() => navigate(`/trip/${trip.id}`)}
                                className={`bg-white rounded-xl shadow-md p-5 cursor-pointer
                                    transform hover:-translate-y-2 hover:shadow-2xl transition duration-300
                                    ${!trip.destination || !trip.startDate || !trip.endDate
                                        ? "border-b-4 border-yellow-400"
                                        : "border-b-4 border-green-500"
                                    }`}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-1">{trip.title}</h2>
                                <p className="text-sm text-gray-500">📍 {trip.destination || "No destination"}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {trip.startDate && trip.endDate
                                        ? `${trip.startDate} → ${trip.endDate}`
                                        : "Incomplete details"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;