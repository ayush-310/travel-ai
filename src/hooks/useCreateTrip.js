import { useState, useEffect } from "react";

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
    const createTrip = () => {
        const newTrip = {
            id: Date.now().toString(),
            ...formData,
            places: [],
            status: "completed",
        };

        const trips = JSON.parse(localStorage.getItem("trips")) || [];

        localStorage.setItem("trips", JSON.stringify([...trips, newTrip]));

        localStorage.removeItem("tripDraft");
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