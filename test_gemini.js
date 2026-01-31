
import { GoogleGenerativeAI } from "@google/generative-ai";

// User's API Key from .env
const apiKey = "AIzaSyB3CDvQVU7OWaL89ewKfuC9caGM3aW57qo";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    console.log("----------------------------------------");
    console.log("Diagnostics: Testing Gemini 2.0 Flash");
    console.log("----------------------------------------");

    // Test: gemini-2.0-flash
    console.log("\n[Test] Attempting with model: 'gemini-2.0-flash'");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        // Simple prompt, no system instruction param
        const result = await model.generateContent("Hello?");
        const response = await result.response;
        console.log("✅ Success! Response:", response.text());
    } catch (error) {
        console.error("❌ Failed:", error.message);
    }
}

run();
