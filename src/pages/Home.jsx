import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import TripCard from "../components/TripCard";

const Home = () => {
    const [trips, setTrips] = useState([]);
    const [draft, setDraft] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
        const storedDraft = JSON.parse(localStorage.getItem("tripDraft"));

        setTrips(storedTrips);
        setDraft(storedDraft);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

            {/* 🌟 Hero Header */}
            <div className="bg-white/70 backdrop-blur-md shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Trips ✈️
                        </h1>
                        <p className="text-sm text-gray-500">
                            Plan, organize and explore your journeys
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/create", { state: { loadDraft: false } })
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                    >
                        + Create Trip
                    </button>
                </div>
            </div>

            {/* 📦 Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* ✨ Trips Section */}
                {trips.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <p className="text-gray-500 text-lg">
                            No trips yet
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Start planning your next adventure 🌍
                        </p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {/* Trips */}
                        {trips.map((trip) => (

                            // Planned Trip Card
                            <div
                                key={trip.id}
                                className={`bg-white rounded-xl shadow-md p-4 cursor-pointer 
      transform hover:-translate-y-1 hover:shadow-xl transition 
      ${!trip.destination || !trip.startDate || !trip.endDate
                                        ? "border-b-4 border-yellow-400"
                                        : "border-b-4 border-green-500"
                                    }`}
                                onClick={() => navigate(`/trip/${trip.id}`)}
                            >
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {trip.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {trip.destination || "No destination"}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    {trip.startDate && trip.endDate
                                        ? `${trip.startDate} → ${trip.endDate}`
                                        : "Incomplete details"}
                                </p>
                            </div>
                        ))}

                        {/* 🟡 Draft Card (LAST) */}

                        {/* // Trip Draft Card */}
                        {draft && (
                            <div className="bg-white rounded-xl shadow-md p-4 border-b-4 border-red-500 transform hover:-translate-y-1 hover:shadow-xl transition">

                                <h2 className="text-lg font-semibold text-red-500 mb-1">
                                    Draft
                                </h2>

                                <p className="text-gray-800 font-medium">
                                    {draft.title || "Untitled Trip"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {draft.destination || "No destination"}
                                </p>

                                <div className="flex gap-2 mt-3">
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