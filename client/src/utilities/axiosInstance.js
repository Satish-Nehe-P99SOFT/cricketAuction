import axios from "axios";

const url = import.meta.env.PROD
  ? "https://ipl-mega-auction.herokuapp.com/"
  : "http://localhost:8080/";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: url,
});

export default axiosInstance;
