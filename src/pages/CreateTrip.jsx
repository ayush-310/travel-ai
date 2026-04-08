import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCreateTrip } from "../hooks/useCreateTrip";

const CreateTrip = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { formData, handleChange, createTrip, saveDraft } =
        useCreateTrip(location.state);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.destination) {
            alert("Please fill all required fields");
            return;
        }

        createTrip();
        navigate("/");
    };

    const handleSaveDraft = () => {
        const res = saveDraft();

        if (!res.success) {
            alert(res.message);
            return;
        }

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

                <div className="flex gap-3">
                    <button
                        disabled={!formData.title || !formData.destination}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Create Trip
                    </button>

                    {/* <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save for Later
                    </button> */}

                    <Link to="/" className="text-blue-500 hover:underline">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateTrip;