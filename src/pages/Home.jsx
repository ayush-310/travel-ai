import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import MapView from "../components/MapView";
import TripCard from "../components/TripCard";
import { onAuthStateChanged } from "firebase/auth";
import { subscribeToTrips } from "../services/firestoreService";




const Home = () => {
    const [trips, setTrips] = useState([]);
    const [draft, setDraft] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedDraft = JSON.parse(localStorage.getItem("tripDraft"));
        setDraft(storedDraft);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/auth");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    

    useEffect(() => {
        let unsubscribeTrips = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                unsubscribeTrips = subscribeToTrips(user.uid, (data) => {
                    setTrips(data); // 🔥 instant update
                });
            } else {
                setTrips([]);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeTrips) unsubscribeTrips();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">

            {/* 🌟 Header */}
            <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

                    {/* Left */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Trips ✈️
                        </h1>
                        <p className="text-sm text-gray-500">
                            Plan, organize and explore your journeys
                        </p>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                navigate("/create", { state: { loadDraft: false } })
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition flex items-center gap-1"
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

            {/* 📦 Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Empty State */}
                {trips.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <p className="text-gray-600 text-lg font-medium">
                            No trips yet ✈️
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Start planning your next adventure 🌍
                        </p>

                        <button
                            onClick={() =>
                                navigate("/create", { state: { loadDraft: false } })
                            }
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Create Your First Trip
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {/* Trips */}
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
                                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                                    {trip.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    📍 {trip.destination || "No destination"}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    {trip.startDate && trip.endDate
                                        ? `${trip.startDate} → ${trip.endDate}`
                                        : "Incomplete details"}
                                </p>
                            </div>
                        ))}

                        {/* 🔴 Draft Card */}
                        {draft && (
                            <div className="bg-white rounded-xl shadow-md p-5 border-b-4 border-red-500
            transform hover:-translate-y-2 hover:shadow-2xl transition duration-300">

                                <h2 className="text-lg font-semibold text-red-500 mb-1">
                                    Draft
                                </h2>

                                <p className="text-gray-800 font-medium">
                                    {draft.title || "Untitled Trip"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    📍 {draft.destination || "No destination"}
                                </p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() =>
                                            navigate("/create", { state: { loadDraft: true } })
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Continue
                                    </button>

                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("tripDraft");
                                            setDraft(null);
                                        }}
                                        className="text-gray-500 hover:text-red-500 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;