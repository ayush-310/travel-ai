import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateTrip = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTrip = {
            id: Date.now().toString(), // simple unique ID
            ...formData,
            places: [],
        };

        // Get existing trips
        const existingTrips = JSON.parse(localStorage.getItem("trips")) || [];

        // Add new trip
        const updatedTrips = [...existingTrips, newTrip];

        // Save back
        localStorage.setItem("trips", JSON.stringify(updatedTrips));

        setFormData({
            title: "",
            destination: "",
            startDate: "",
            endDate: "",
        });

        // Redirect to home
        navigate("/");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create a Trip</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Trip Title"
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

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Trip
                </button>

            </form>
        </div>
    )
}


export default CreateTrip
