import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { config } from '../config/config';
import { tokenService } from '../services/token.service';

export const api = axios.create({
  baseURL: config.BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetcher = async (url: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const response = await api({
      url,           // URL for the request
      method: options?.method || 'GET',  // Default to GET if no method is provided
      headers: options?.headers,         // Pass custom headers if provided
      data: options?.data,               // Pass request body for POST/PUT
      params: options?.params,           // Pass query parameters for GET requests
    });
    return response; // Return Axios response object
  } catch (error) {
    // Handle error, or rethrow if needed
    console.error('API request failed:', error);
    throw error;  // Rethrow the error for further handling
  }
};

export const fetchData = async (url: string): Promise<AxiosResponse> => {
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


