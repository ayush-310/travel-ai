import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../utils/constants";

// console.log(GEMINI_API_KEY )

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // 🔥 replace

export const generateTripPlan = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();
    } catch (error) {
        console.error("AI Error:", error);
        return "Something went wrong!";
    }
};