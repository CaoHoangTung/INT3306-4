/**
 * @file Base API object to use in other api utilities
*/

import { removeLocalCredential, getLocalCredential } from "../utils/auth";
import axios from "axios";

/**
 * API endpoint
*/
export const BASE_API_PATH = process.env.BASE_API_PATH || "http://165.22.106.61:8000/api";
console.log("API PATH", BASE_API_PATH)

/**
 * Axious default object
*/
const API = axios.create({
  baseURL: BASE_API_PATH,
  timeout: 25000,
});

/**
 * The default HTTP request header
*/
API.defaults.headers = {
  'Authorization': `${getLocalCredential()?.token_type} ${getLocalCredential()?.access_token}`,
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};

/**
 * The axios interceptor. 
 * This will clear the user credential in local storage and redirect to /login page if the credential is not valid or expired
*/
API.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error?.response?.status === 403) {
    // alert("You are not authorized. Please login again");
    removeLocalCredential();
    window.location.href = "/login";
  } else if (error?.response?.status === 401) {
    // alert("Your session has expired. Please login again");
    removeLocalCredential();
    window.location.href = "/login";
  } else if (error?.response?.status === 500) {
    // alert("Internal server error. Please try again later");
  } else if (error?.response?.status === 404) {
    // alert("Resource not found. Please try again later");
  } else if (error?.response?.status === 400) {
    // alert("Bad request. Please try again later");
  } else if (error?.response?.status === 405) {
    // alert("Method not allowed. Please try again later");
  }
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

export default API;