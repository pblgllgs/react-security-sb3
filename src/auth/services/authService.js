import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:8080",
  });
    
  export const getAuthentication = (body) => {
    return apiClient.post("/api/v1/auth/authenticate", body);
  };

  export const registration = (body) => {
    return apiClient.post("/api/v1/auth/register", body);
  };