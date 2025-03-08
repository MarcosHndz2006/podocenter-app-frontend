import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/providers/'; // Replace with your actual API base URL

// Function to create a new provider
export const createProvider = async(providerData) => {
    try {
        const response = await axios.post(API_BASE_URL, providerData);
        return response.data;
    } catch (error) {
        console.error('Error creating provider:', error);
        throw error;
    }
};

// Function to fetch all providers
export const getAllProviders = async() => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching providers:', error);
        throw error;
    }
};