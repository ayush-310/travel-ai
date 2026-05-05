import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import { useTripDetails } from "../hooks/useTripDetails";
import AITripPlanner from "../components/AITripPlanner";

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        trip,
        coords,
        newPlace,
        markers,
        setNewPlace,
        isEditing,
        setIsEditing,
        editData,
        setEditData,
        addPlace,
        deletePlace,
        deleteTrip,
        updateTrip,
    } = useTripDetails(id);

    if (!trip) return <p className="p-6">Trip not found</p>;

    return (
        <div className="min-h-screen bg-gray-100">

            {/* 🔝 Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
                <button
                    onClick={() => navigate("/")}
                    className="text-blue-600 hover:underline"
                >
                    ← Back
                </button>

                <h1 className="text-lg font-semibold text-gray-700">
                    Trip Details
                </h1>

                <div />
            </div>

            {/* 🧾 Trip Info */}
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4">

                    {isEditing ? (
                        <div className="space-y-2">
                            <input
                                value={editData.title}
                                onChange={(e) =>
                                    setEditData({ ...editData, title: e.target.value })
                                }
                                className="p-2 border rounded w-full"
                            />

                            <input
                                value={editData.destination}
                                onChange={(e) =>
                                    setEditData({ ...editData, destination: e.target.value })
                                }
                                className="p-2 border rounded w-full"
                            />

                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={editData.startDate}
                                    onChange={(e) =>
                                        setEditData({ ...editData, startDate: e.target.value })
                                    }
                                    className="p-2 border rounded w-full"
                                />

                                <input
                                    type="date"
                                    value={editData.endDate}
                                    onChange={(e) =>
                                        setEditData({ ...editData, endDate: e.target.value })
                                    }
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">{trip.title}</h2>
                            <p className="text-gray-600">{trip.destination}</p>
                            <p className="text-sm text-gray-400">
                                {trip.startDate && trip.endDate
                                    ? `${trip.startDate} → ${trip.endDate}`
                                    : "Dates not specified"}
                            </p>
                        </>
                    )}

                    {/* ✅ Single set of action buttons — no duplicates */}
                    <div className="flex gap-3 mt-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={updateTrip}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-400 text-white px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTrip(navigate)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* 🔥 MAIN SPLIT SECTION */}
                <div className="grid md:grid-cols-2 gap-4">

                    {/* 🗺️ LEFT - MAP */}
                    <div className="bg-white rounded-xl shadow-sm p-2 h-[500px]">
                        <MapView
                            lat={coords.lat}
                            lng={coords.lng}
                            markers={markers}
                        />
                    </div>

                    {/* 📍 RIGHT - PLACES */}
                    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">

                        <h3 className="text-lg font-semibold mb-3">Places</h3>

                        {/* Add Place */}
                        <div className="flex gap-2 mb-3">
                            <input
                                value={newPlace}
                                onChange={(e) => setNewPlace(e.target.value)}
                                placeholder="Add a place..."
                                className="flex-1 p-2 border rounded"
                                onKeyDown={(e) => e.key === "Enter" && addPlace()}
                            />
                            <button
                                onClick={addPlace}
                                className="bg-blue-600 text-white px-3 rounded"
                            >
                                Add
                            </button>
                        </div>

                        {/* Places List */}
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {!trip.places || trip.places.length === 0 ? (
                                <p className="text-gray-400 text-sm">No places added</p>
                            ) : (
                                trip.places.map((place, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded border"
                                    >
                                        <span>{place}</span>
                                        <button
                                            onClick={() => deletePlace(i)}
                                            className="text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <AITripPlanner />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;