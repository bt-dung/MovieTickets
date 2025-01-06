import axios from 'axios';
import { data } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const res = await apiClient.patch(endpoint, data);
    return res.data;
  } catch (error) {
    console.error('Error update data:', error);
    throw error;
  }
}
export const deleteData = async (endpoint) => {
  try {
    const res = await apiClient.delete(endpoint);
    return res;
  } catch (error) {
    console.error('Error while deleting user:', error);
    throw error;
  }
}