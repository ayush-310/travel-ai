import { useEffect, useState } from "react";
import { getCoordinates } from "../services/geocode";
import { db } from "../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { updateTripInDB, deleteTripFromDB } from "../services/firestoreService";

export const useTripDetails = (id) => {
    const [markers, setMarkers] = useState([]);
    const [trip, setTrip] = useState(null);
    const [coords, setCoords] = useState({
        lat: 28.6139,
        lng: 77.209,
    });

    const [newPlace, setNewPlace] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    // ✅ Load trip from Firestore in real-time
    useEffect(() => {
        if (!id) return;

        const tripRef = doc(db, "trips", id);
        const unsubscribe = onSnapshot(tripRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = { id: docSnap.id, ...docSnap.data() };
                setTrip(data);
            } else {
                setTrip(null);
            }
        });

        return () => unsubscribe();
    }, [id]);

    // Sync edit data when trip loads
    useEffect(() => {
        if (trip) setEditData({ ...trip });
    }, [trip]);

    // Fetch map markers for places
    useEffect(() => {
        const fetchMarkers = async () => {
            if (!trip?.places || trip.places.length === 0) {
                setMarkers([]);
                return;
            }

            const results = [];
            for (const place of trip.places) {
                const query = `${place}, ${trip.destination}`;
                const res = await getCoordinates(query);
                if (res) {
                    results.push({ name: place, lat: res.lat, lng: res.lng });
                }
            }
            setMarkers(results);
        };

        fetchMarkers();
    }, [trip]);

    // Fetch destination coordinates
    useEffect(() => {
        const fetchCoords = async () => {
            if (trip?.destination) {
                const res = await getCoordinates(trip.destination);
                if (res) setCoords(res);
            }
        };

        fetchCoords();
    }, [trip]);

    // ✅ Add place — updates Firestore
    const addPlace = async () => {
        if (!newPlace.trim() || !trip) return;

        const updatedPlaces = [...(trip.places || []), newPlace.trim()];
        await updateTripInDB(id, { places: updatedPlaces });
        setNewPlace("");
    };

    // ✅ Delete place — updates Firestore
    const deletePlace = async (index) => {
        if (!trip) return;

        const updatedPlaces = trip.places.filter((_, i) => i !== index);
        await updateTripInDB(id, { places: updatedPlaces });
    };

    // ✅ Delete trip — removes from Firestore
    const deleteTrip = async (navigate) => {
        await deleteTripFromDB(id);
        navigate("/");
    };

    // ✅ Update trip — saves to Firestore
    const updateTrip = async () => {
        if (!editData) return;
        await updateTripInDB(id, editData);
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