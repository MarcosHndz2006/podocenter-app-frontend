import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/items/'; // Replace with your actual API base URL

// Function to fetch all inventory items
export const getAllInventoryItems = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        throw error;
    }
};

// Function to delete an inventory item by ID
export const deleteInventoryItem = async (itemId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        throw error;
    }
};

// Function to create a new inventory item
export const createInventoryItem = async (itemData) => {
    try {
        const response = await axios.post(API_BASE_URL, itemData);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory item:', error);
        throw error;
    }
};

// Function to update an inventory item
export const updateInventoryItem = async (itemData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/update`, itemData,
            {
                headers: { 'Content-Type': 'application/json' }
            })
        return response.data
    } catch (error) {
        console.error("Error updating inventory item: ", error)
        throw error
    }
}

// Function to get clasifications
export const getClasifications = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/clasification/all/`);
        return response.data;
    } catch (error) {
        console.error('Error getting clasifications', error)
        throw error;
    }
}

//Function to get units
export const getUnits = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/units`)
        return response.data
    } catch (error) {
        console.error('Error getting units: ', error)
        throw error;
    }
}

//Function to get farmacehouses
export const getFarmacehouses = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/farmacehouses`)
        return response.data;
    } catch (error) {
        console.error('Error getting farmacehouses: ', error)
        throw error;
    }
}