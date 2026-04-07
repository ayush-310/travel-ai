import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripCard from "./TripCard";

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
        <div className="p-6 max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Trips</h1>

                <button
                    onClick={() => navigate("/create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Create Trip
                </button>
            </div>

            {/* 🔥 Draft Section */}
            {draft && (
                <div className="mb-6 p-4 border rounded bg-yellow-50">
                    <h2 className="text-lg font-semibold text-yellow-700 mb-2">
                        🟡 Draft Trip
                    </h2>

                    <p className="font-medium">
                        {draft.title || "Untitled Trip"}
                    </p>

                    <p className="text-sm text-gray-600">
                        {draft.destination || "No destination yet"}
                    </p>

                    <button
                        onClick={() => navigate("/create")}
                        className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                        Continue Editing
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("tripDraft");
                            setDraft(null);
                        }}
                        className="ml-2 text-red-500"
                    >
                        Delete Draft
                    </button>
                </div>
            )}

            {/* Completed Trips */}
            {trips.length === 0 ? (
                <p className="text-gray-500">No trips yet. Create one!</p>
            ) : (
                <div className="grid gap-4">
                    {trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            onClick={() => navigate(`/trip/${trip.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;