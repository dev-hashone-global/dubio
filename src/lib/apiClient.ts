import axios from "axios"

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://api.dubio.ai/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;