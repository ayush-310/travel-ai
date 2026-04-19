import React, { useState } from "react";
import { generateTripPlan } from "../services/aiService";

const AITripPlanner = () => {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        const finalPrompt = `
  Create a travel itinerary based on this request:
  "${prompt}"

  Format strictly like:
  Day 1:
  - Activity 1
  - Activity 2

  Day 2:
  - Activity 1
  - Activity 2

  Keep it short, clear and well structured.
  `;

        const res = await generateTripPlan(finalPrompt);

        setResult(res);
        setLoading(false);
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-md mt-6">

            <h2 className="text-xl font-semibold mb-4">
                🤖 AI Trip Planner
            </h2>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Plan a 3-day trip to Goa under budget..."
                className="w-full p-3 border rounded mb-3"
            />

            <button
                onClick={handleGenerate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Generating..." : "Generate Plan"}
            </button>

            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-line">
                    {result}
                </div>
            )}
        </div>
    );
};

export default AITripPlanner;