// // src/api/axiosInstance.js
// import axios from "axios";

// console.log(import.meta.env.VITE_API_URL);

// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   // withCredentials: true, // if using cookies
// });

// axiosInstance.interceptors.request.use(
//   (config)=>{
//      const token = localStorage.getItem("token");
//      console.log(token);
     
//     if(token){
//       config.headers.Authorization = `Bearer ${token}`
//     }
    
//     return config
//   },
//    (error) => {
//     return Promise.reject(error);
//   }

// )

// export default axiosInstance;
// src/api/axiosInstance.js
import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  // ✅ No global "Content-Type" — let individual requests decide
});

// Add auth token from localStorage to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("JWT token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
