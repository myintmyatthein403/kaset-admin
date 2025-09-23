import { config } from '@/common/config/config';
import { tokenService } from '@/common/services/token.service';
import { useAuthStore } from '@/common/store/authStore';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: config.BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetcher = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const response = await api({
      url,           // URL for the request
      method: options?.method || 'GET',  // Default to GET if no method is provided
      headers: options?.headers,         // Pass custom headers if provided
      data: options?.data,               // Pass request body for POST/PUT
      params: options?.params,           // Pass query parameters for GET requests
    });
    return response; // Return Axios response object
  } catch (error: any) {
    // Handle error, or rethrow if needed
    if (error.status == 401) {
      console.log(error)
      useAuthStore.getState().logout()
    } else {
      console.error('API request failed:', error);
      throw error;  // Rethrow the error for further handling
    }
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetcher(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await tokenService.getAccessToken()}`,
      },
    });
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};


