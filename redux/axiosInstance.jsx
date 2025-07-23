import axios from "axios";


console.log("value")
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  withCredentials: true,
});
export default axiosInstance;




export const ENDPOINT = process.env.NEXT_PUBLIC_SERVER;
