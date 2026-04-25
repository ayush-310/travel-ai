import { useState, useEffect } from "react";
    import { addTripToDB } from "../services/firestoreService";
    import { auth } from "../services/firebase";

export const useCreateTrip = (locationState) => {
    const [formData, setFormData] = useState({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
    });

    // 🔥 Load / Reset Draft
    useEffect(() => {
        const shouldLoadDraft = locationState?.loadDraft;

        if (!shouldLoadDraft) {
            localStorage.removeItem("tripDraft");
            setFormData({
                title: "",
                destination: "",
                startDate: "",
                endDate: "",
            });
        } else {
            const draft = JSON.parse(localStorage.getItem("tripDraft"));
            if (draft) setFormData(draft);
        }
    }, [locationState]);

    // 🔥 Handle Input
    const handleChange = (e) => {
        const { name, value } = e.target;

        const updated = {
            ...formData,
            [name]: value,
        };

        setFormData(updated);
        localStorage.setItem("tripDraft", JSON.stringify(updated));
    };

    // ✅ Create Trip
    const createTrip = async () => {
        if (!formData.title || !formData.destination) return;

        const user = auth.currentUser;

        if (!user) {
            alert("User not logged in");
            return;
        }

        const newTrip = {
            title: formData.title.trim(),
            destination: formData.destination.trim(),
            startDate: formData.startDate,
            endDate: formData.endDate,
            places: [],
        };

        await addTripToDB(newTrip, user.uid);

        // clear draft
        localStorage.removeItem("tripDraft");

        setFormData({
            title: "",
            destination: "",
            startDate: "",
            endDate: "",
        });
    };

    // ✅ Save Draft
    const saveDraft = () => {
        if (!formData.title.trim()) {
            return { success: false, message: "Title is required" };
        }

        localStorage.setItem("tripDraft", JSON.stringify(formData));
        return { success: true };
    };

    return {
        formData,
        handleChange,
        createTrip,
        saveDraft,
    };
};