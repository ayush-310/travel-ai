import { useEffect, useState } from "react";
import { getCoordinates } from "../services/geocode";

export const useTripDetails = (id) => {
    const [trip, setTrip] = useState(null);
    const [coords, setCoords] = useState({
        lat: 28.6139,
        lng: 77.2090,
    });

    const [newPlace, setNewPlace] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    // Load trip
    useEffect(() => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];
        const foundTrip = trips.find((t) => t.id === id);
        setTrip(foundTrip);
    }, [id]);

    // Sync edit data
    useEffect(() => {
        if (trip) setEditData(trip);
    }, [trip]);

    // Fetch coordinates
    useEffect(() => {
        const fetchCoords = async () => {
            if (trip?.destination) {
                const res = await getCoordinates(trip.destination);
                if (res) setCoords(res);
            }
        };

        fetchCoords();
    }, [trip]);

    // Add place
    const addPlace = () => {
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

    // Delete place
    const deletePlace = (index) => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];

        const updatedTrips = trips.map((t) => {
            if (t.id === id) {
                return {
                    ...t,
                    places: t.places.filter((_, i) => i !== index),
                };
            }
            return t;
        });

        localStorage.setItem("trips", JSON.stringify(updatedTrips));
        setTrip(updatedTrips.find((t) => t.id === id));
    };

    // Delete trip
    const deleteTrip = (navigate) => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];
        const updated = trips.filter((t) => t.id !== id);

        localStorage.setItem("trips", JSON.stringify(updated));
        navigate("/");
    };

    // Update trip
    const updateTrip = () => {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];

        const updatedTrips = trips.map((t) =>
            t.id === id ? editData : t
        );

        localStorage.setItem("trips", JSON.stringify(updatedTrips));
        setTrip(editData);
        setIsEditing(false);
    };

    return {
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
    };
};