import axios, { AxiosRequestConfig } from "axios";
import { api } from "../models/endpoints";

const customAxios = axios.create({
  baseURL: api.MainURL,
});

customAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = window.localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }

  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default customAxios;
