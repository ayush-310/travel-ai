import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import { useTripDetails } from "../hooks/useTripDetails";

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        trip,
        coords,
        newPlace,
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
        <div className="p-6 max-w-2xl mx-auto">

            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="text-blue-600 hover:underline"
                >
                    ← Back
                </button>

                <span className="text-gray-500 text-sm">Trip Details</span>
            </div>

            {/* Edit / View */}
            {isEditing ? (
                <>
                    <input
                        value={editData.title}
                        onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                        }
                        className="p-2 border rounded w-full mb-2"
                    />

                    <input
                        value={editData.destination}
                        onChange={(e) =>
                            setEditData({ ...editData, destination: e.target.value })
                        }
                        className="p-2 border rounded w-full mb-2"
                    />

                    <input
                        type="date"
                        value={editData.startDate}
                        onChange={(e) =>
                            setEditData({ ...editData, startDate: e.target.value })
                        }
                        className="p-2 border rounded w-full mb-2"
                    />

                    <input
                        type="date"
                        value={editData.endDate}
                        onChange={(e) =>
                            setEditData({ ...editData, endDate: e.target.value })
                        }
                        className="p-2 border rounded w-full mb-4"
                    />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">{trip.title}</h1>
                    <p className="text-gray-600">{trip.destination}</p>
                    <MapView lat={coords.lat} lng={coords.lng} />
                </>
            )}

            {/* Buttons */}
            <div className="flex gap-2 my-4">
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                        Edit
                    </button>
                )}

                {isEditing && (
                    <button onClick={updateTrip} className="bg-green-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                )}

                <button onClick={() => deleteTrip(navigate)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                </button>
            </div>

            {/* Add Place */}
            <div className="flex gap-2 mb-4">
                <input
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={addPlace} className="bg-blue-500 text-white px-4 rounded">
                    Add
                </button>
            </div>

            {/* Places */}
            {trip.places.map((place, i) => (
                <div key={i} className="flex justify-between border p-2 mb-2 rounded">
                    {place}
                    <button onClick={() => deletePlace(i)}>❌</button>
                </div>
            ))}
        </div>
    );
};

export default TripDetails;