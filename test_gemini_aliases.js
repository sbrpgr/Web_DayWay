
import { GoogleGenerativeAI } from "@google/generative-ai";

// User's API Key from .env
const apiKey = "AIzaSyB3CDvQVU7OWaL89ewKfuC9caGM3aW57qo";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    console.log("----------------------------------------");
    console.log("Diagnostics: Testing Gemini Flash Latest");
    console.log("----------------------------------------");

    // Test: gemini-flash-latest
    // 이전에 1.5-flash는 404였으나, 리스트에는 gemini-flash-latest가 있었음.
    // 이것이 작동하는지 확인.
    console.log("\n[Test] Attempting with model: 'gemini-flash-latest'");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hello?");
        const response = await result.response;
        console.log("✅ Success! Response:", response.text());
    } catch (error) {
        console.error("❌ Failed:", error.message);
    }
}

run();
