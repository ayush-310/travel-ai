import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import { getCoordinates } from "../services/geocode";

const TripDetails = () => {
    const [coords, setCoords] = useState({
        lat: 28.6139,
        lng: 77.2090,
    });
    const { id } = useParams();
    const navigate = useNavigate();



    const [trip, setTrip] = useState(null);
    const [newPlace, setNewPlace] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];
        const foundTrip = trips.find((t) => t.id === id);
        setTrip(foundTrip);
    }, [id]);

    useEffect(() => {
        if (trip) setEditData(trip);
    }, [trip]);

    useEffect(() => {
        const fetchCoords = async () => {
            if (trip?.destination) {
                const result = await getCoordinates(trip.destination);

                if (result) {
                    setCoords(result);
                }
            }
        };

        fetchCoords();
    }, [trip]);

    const handleAddPlace = () => {
        if (!newPlace.trim()) return;

        const trips = JSON.parse(localStorage.getItem("trips")) || [];

        const updatedTrips = trips.map((t) =>
            t.id === id
                ? { ...t, places: [...t.places, newPlace.trim()] }
                : t
        );

        localStorage.setItem("trips", JSON.stringify(updatedTrips));

        setTrip(updatedTrips.find((t) => t.id === id));
        setNewPlace("");
    };

    const handleDeletePlace = (index) => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];

        const updatedTrips = trips.map((t) => {
            if (t.id === id) {
                const updatedPlaces = t.places.filter((_, i) => i !== index);
                return { ...t, places: updatedPlaces };
            }
            return t;
        });

        localStorage.setItem("trips", JSON.stringify(updatedTrips));
        setTrip(updatedTrips.find((t) => t.id === id));
    };

    const handleDeleteTrip = () => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];
        const updatedTrips = trips.filter((t) => t.id !== id);

        localStorage.setItem("trips", JSON.stringify(updatedTrips));
        navigate("/");
    };

    const handleUpdateTrip = () => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];

        const updatedTrips = trips.map((t) =>
            t.id === id ? editData : t
        );

        localStorage.setItem("trips", JSON.stringify(updatedTrips));

        setTrip(editData);
        setIsEditing(false);
    };

    const handleSaveAndGoHome = () => {
        navigate("/");
    };

    if (!trip) return <p className="p-6">Trip not found</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">

            {/* Edit/View Mode */}
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                        }
                        className="p-2 border rounded w-full mb-2"
                    />

                    <input
                        type="text"
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
                    <h1 className="text-2xl font-bold mb-2">{trip.title}</h1>
                    <p className="text-gray-600">{trip.destination}</p>
                    <MapView lat={coords.lat} lng={coords.lng} />
                    <p className="text-sm text-gray-500 mb-4">
                        {trip.startDate} → {trip.endDate}
                    </p>
                </>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit Trip
                    </button>
                )}

                {isEditing && (
                    <button
                        onClick={handleUpdateTrip}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                )}

                <button
                    onClick={handleDeleteTrip}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete Trip
                </button>
            </div>

            {/* Add Place */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newPlace}
                    onChange={(e) => setNewPlace(e.target.value)}
                    placeholder="Add a place"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={handleAddPlace}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Add
                </button>
            </div>

            {/* Places */}
            {trip.places.length === 0 ? (
                <p className="text-gray-500">No places added yet</p>
            ) : (
                <ul className="space-y-2">
                    {trip.places.map((place, index) => (
                        <li
                            key={index}
                            className="p-2 border rounded flex justify-between"
                        >
                            {place}
                            <button
                                onClick={() => handleDeletePlace(index)}
                                className="text-red-500"
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleSaveAndGoHome}
                className="bg-blue-600 text-white px-6 py-2 rounded w-full hover:bg-blue-700 transition"
            >
                Save & Go Home
            </button>
        </div>
    );
};

export default TripDetails;