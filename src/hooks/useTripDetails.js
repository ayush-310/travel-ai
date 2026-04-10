import { useEffect, useState } from "react";
import { getCoordinates } from "../services/geocode";

export const useTripDetails = (id) => {

    const [markers, setMarkers] = useState([]);
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

    useEffect(() => {
        const fetchMarkers = async () => {
            if (!trip?.places || trip.places.length === 0) {
                setMarkers([]);
                return;
            }

            const results = [];

            for (const place of trip.places) {
                const query = `${place}, ${trip.destination}`;
                console.log("Fetching:", query);

                const res = await getCoordinates(query);
                console.log("Result:", res);

                if (res) {
                    results.push({
                        name: place,
                        lat: res.lat,
                        lng: res.lng,
                    });
                }
            }

            console.log("Final Markers:", results);
            setMarkers(results);
        };

        fetchMarkers();
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
    };
};