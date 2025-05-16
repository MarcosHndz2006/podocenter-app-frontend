import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/storage/'; // Replace with your actual API base URL

// Function to create a new store
export const createStore = async(storeData) => {
    try {
        const response = await axios.post(API_BASE_URL, storeData);
        return response.data;
    } catch (error) {
        console.error('Error creating store:', error);
        throw error;
    }
};

// Function to fetch all stores
export const getAllStores = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shelfs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw error;
    }
};