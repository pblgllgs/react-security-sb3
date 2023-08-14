import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:8080",
  });
  
  // axios.interceptors.request.use((config) => {
  //   config.headers.Authorization = "Basic dXNlcm5hbWU6cGFzc3dvcmQ=";
  //   return config;
  // });
  
  
  // export const getHello = () => {
  //   return apiClient.get("/todos");
  // };
  //localhost:8080/api/v1/auth/authenticate
  
  
  export const getAuthentication = (body) => {
    return apiClient.post("/api/v1/auth/authenticate", body);
  };

  export const registration = (body) => {
    return apiClient.post("/api/v1/auth/register", body);
  };