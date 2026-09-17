# Security maintenance

Report suspected credentials privately to the repository owner. Do not paste keys into an issue or pull request.

`npm run build` scans the generated public assets for Google API keys, GitHub tokens, and private-key markers. It blocks the build and prints file paths only when a match is found. Run `npm run test:security` to validate this guard.

Never supply a private Gemini API key through `VITE_GEMINI_API_KEY`: Vite client variables are bundled into public JavaScript. A production AI integration requires a server-side proxy with secret storage, authentication or abuse controls, and usage limits before enabling the chat feature with a service-owned key.

CI runs a production build and a dependency audit that rejects high/critical findings. Moderate development-tool advisories must still be tracked and reviewed; a passing build is not a complete security assessment.
