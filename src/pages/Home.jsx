import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripCard from "./TripCard";

const Home = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
        setTrips(storedTrips);
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl bg- font-bold">My Trips</h1>

                <button
                    onClick={() => navigate("/create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Create Trip
                </button>
            </div>

            {/* Trips List */}
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