import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      'Content-Type': 'application/json',
      // You can add other headers here if needed
      // 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`, // Uncomment if needed
    },
  });
  
  // Function to fetch data
  export const fetchData = async (endpoint) => {
    try {
      const response = await apiClient.get(endpoint);
      return response.data; // Return the data from the response
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for further handling
    }
  };
  
  // Function to post data
  export const postData = async (endpoint, data) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error posting data:', error);
      throw error; // Rethrow the error for further handling
    }
  };