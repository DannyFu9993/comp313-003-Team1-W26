import axios from "axios";

// Use environment variable if set, otherwise use relative path for production
// Local: http://localhost:5001/api
// Production: /api (same domain as frontend)
const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL,
});

// Attach JWT token to every request if one is stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export const getAccommodations = (filters = {}) =>
  api.get("/accommodations", { params: filters });

export const getFeaturedAccommodations = () =>
  api.get("/accommodations/featured/list");

export const getFavourites = () => api.get("/user/favourites");

export const addFavourite = (id) => api.post(`/user/favourites/${id}`);

export const removeFavourite = (id) => api.delete(`/user/favourites/${id}`);

export default api;