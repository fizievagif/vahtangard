import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "./app/store";

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});
export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};
export default axiosApi;