// frontend/src/config.js

// API Base URL
// Local: http://localhost:5001
// Production: '' (empty - uses same domain)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Full API URL helper
export const getApiUrl = (endpoint) => {
  // If endpoint already starts with /, just prepend base URL
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${path}`;
};