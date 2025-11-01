import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

// attaching token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenKey");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
