import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateTrip = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
    });

    // 🔥 Auto-load draft if exists
    useEffect(() => {
        const draft = JSON.parse(localStorage.getItem("tripDraft"));
        if (draft) {
            setFormData(draft);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedData);

        // 🔥 Auto-save draft while typing
        localStorage.setItem("tripDraft", JSON.stringify(updatedData));
    };

    // ✅ FINAL SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.destination) {
            alert("Please fill all required fields");
            return;
        }

        const newTrip = {
            id: Date.now().toString(),
            ...formData,
            places: [],
            status: "completed",
        };

        const existingTrips = JSON.parse(localStorage.getItem("trips")) || [];

        localStorage.setItem(
            "trips",
            JSON.stringify([...existingTrips, newTrip])
        );

        // 🔥 Remove draft after submit
        localStorage.removeItem("tripDraft");

        setFormData({
            title: "",
            destination: "",
            startDate: "",
            endDate: "",
        });

        navigate("/");
    };

    // ✅ SAVE FOR LATER (MANUAL BUTTON)
    const handleSaveDraft = () => {
        if (!formData.title.trim()) {
            alert("Title is required to save draft");
            return;
        }

        localStorage.setItem("tripDraft", JSON.stringify(formData));

        alert("Saved for later!");
        navigate("/");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create a Trip</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Trip Title *"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                {/* Buttons */}
                <div className="flex gap-3">

                    <button
                        disabled={!formData.title || !formData.destination}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Create Trip
                    </button>

                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save for Later
                    </button>

                    <Link to="/" className="text-blue-500 hover:underline">
                        Cancel
                    </Link>

                </div>
            </form>
        </div>
    );
};

export default CreateTrip;