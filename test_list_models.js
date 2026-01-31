
// User's API Key from .env
const apiKey = "AIzaSyB3CDvQVU7OWaL89ewKfuC9caGM3aW57qo";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    console.log("Fetching available models from API...");
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("\n✅ Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("❌ No models found or error response:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("❌ Network or Parsing Error:", e);
    }
}

listModels();
