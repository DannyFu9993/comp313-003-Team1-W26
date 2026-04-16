import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
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
