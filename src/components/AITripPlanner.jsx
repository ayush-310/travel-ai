import React, { useState } from "react";
import { generateTripPlan } from "../services/aiService";

const AITripPlanner = () => {
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!destination || !days || !budget) return;

        setLoading(true);

        const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Budget: ₹${budget}
Duration: ${days} days

Return response in STRICT JSON format:
{
  "overview": "",
  "total_estimated_cost": "",
  "day_wise_plan": [
    {
      "day": 1,
      "activities": [],
      "estimated_cost": ""
    }
  ],
  "tips": []
}
`;

        try {
            const res = await generateTripPlan(prompt);

            // Clean & parse JSON
            const cleaned = res.replace(/```json|```/g, "");
            const data = JSON.parse(cleaned);

            setResult(data);
        } catch (err) {
            console.error(err);
            setResult(null);
        }

        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mt-6">

            <h2 className="text-xl font-semibold mb-4">
                🤖 AI Trip Planner
            </h2>

            {/* Inputs */}
            <input
                type="text"
                placeholder="Destination (e.g. Goa)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 border rounded mb-3"
            />

            <input
                type="number"
                placeholder="Number of days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full p-3 border rounded mb-3"
            />

            <input
                type="number"
                placeholder="Budget (₹)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 border rounded mb-3"
            />

            <button
                onClick={handleGenerate}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                {loading ? "Generating..." : "Generate Plan"}
            </button>

            {/* Result */}
            {result && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Overview</h3>
                    <p className="mb-4">{result.overview}</p>

                    <h3 className="text-lg font-bold mb-2">Total Cost</h3>
                    <p className="mb-4">{result.total_estimated_cost}</p>

                    <h3 className="text-lg font-bold mb-2">Day-wise Plan</h3>
                    {result.day_wise_plan.map((day) => (
                        <div
                            key={day.day}
                            className="bg-gray-100 p-4 rounded mb-3"
                        >
                            <h4 className="font-semibold">
                                Day {day.day}
                            </h4>
                            <ul className="list-disc ml-5">
                                {day.activities.map((act, idx) => (
                                    <li key={idx}>{act}</li>
                                ))}
                            </ul>
                            <p className="text-sm mt-2">
                                Cost: {day.estimated_cost}
                            </p>
                        </div>
                    ))}

                    <h3 className="text-lg font-bold mb-2">Tips</h3>
                    <ul className="list-disc ml-5">
                        {result.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AITripPlanner;