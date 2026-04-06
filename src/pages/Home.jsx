import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <h1 className="text-2xl font-bold">My Trips</h1>

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
                        <div
                            key={trip.id}
                            onClick={() => navigate(`/trip/${trip.id}`)}
                            className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50"
                        >
                            <h2 className="text-xl font-semibold">{trip.title}</h2>
                            <p className="text-gray-600">{trip.destination}</p>
                            <p className="text-sm text-gray-500">
                                {trip.startDate} → {trip.endDate}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;