
import axios from "axios";

const csrfClient = axios.create({
  baseURL: "http://localhost:8000",  
  withCredentials: true,
  withXSRFToken: true,
});

export default csrfClient;
