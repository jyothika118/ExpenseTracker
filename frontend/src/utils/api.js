import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:30022/api",  // <=== BACKEND URL
  headers: { "Content-Type": "application/json" }
});

export default api;
