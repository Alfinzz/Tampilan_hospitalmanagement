
import axios from "axios";

const csrfClient = axios.create({
  baseURL: "http://localhost:8000",  
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default csrfClient;