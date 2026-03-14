import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const getAccommodations = () => api.get("/accommodations");

export default api;
