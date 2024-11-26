import axios from "axios";

axios.defaults.baseURL = '/api/';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add this function to dynamically set the content type
export const setRequestConfig = (data) => {
  if (data instanceof FormData) {
    return {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
  }
  return {
    headers: { 'Content-Type': 'application/json' }
  };
};