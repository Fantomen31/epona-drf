import axios from "axios";

//axios.defaults.baseURL = 'https://8000-fantomen31-eponadrf-tr3makianj4.ws.codeinstitute-ide.net/api';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();