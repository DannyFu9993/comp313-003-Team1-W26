import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const getAccommodations = (filters = {}) =>
  api.get("/accommodations", { params: filters });

export const getFeaturedAccommodations = () =>
  api.get("/accommodations/featured/list");

export default api;
