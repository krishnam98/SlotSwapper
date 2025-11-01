import axios from "axios";

const API = axios.create({
  baseURL: "https://slotswapper-backend-kqx9.onrender.com",
  timeout: 10000,
});

// attaching token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenKey");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
