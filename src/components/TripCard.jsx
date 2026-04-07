import React from "react";

const TripCard = ({ trip, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50 transition"
        >
            <h2 className="text-xl font-semibold">{trip.title}</h2>
            <p className="text-gray-600">{trip.destination}</p>
            <p className="text-sm text-gray-500">
                {trip.startDate} → {trip.endDate}
            </p>
        </div>
    );
};

export default TripCard;