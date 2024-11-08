import axios from "axios";

// axios.defaults.baseURL = 'https://epona-drf-api-0cc8608a0241.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();