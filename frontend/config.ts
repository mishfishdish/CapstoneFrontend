const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};

if (!config.apiBaseUrl) {
    throw new Error("Missing VITE_API_BASE_URL");
}

export default config;