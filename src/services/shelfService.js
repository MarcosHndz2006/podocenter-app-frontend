import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/shelves'; // Replace with your actual API base URL

// Function to fetch all shelves for a specific store
export const getShelvesByStoreId = async (storeId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/${storeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shelves:', error);
        throw error;
    }
};

// Function to create a new shelf
export const createShelf = async (shelfData) => {
    try {
        const response = await axios.post(API_BASE_URL, shelfData,
            { headers: { 'Content-Type': 'application/json' } });
        return response.data;
    } catch (error) {
        console.error('Error creating shelf:', error);
        throw error;
    }
};

export const getAllShelfs = async () => {
    try {
        const response = await axios.get(API_BASE_URL)
        return response.data
    } catch (error) {
        console.error("error fetching shelfs: ", error)
        throw error
    }
}