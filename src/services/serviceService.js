import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/services'; // Replace with your actual API base URL

// Function to fetch services by user ID
export const getServicesByUserId = async(userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Function to update service state
export const updateServiceState = async(serviceId, newState) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${serviceId}`, { state: newState });
        return response.data;
    } catch (error) {
        console.error('Error updating service state:', error);
        throw error;
    }
};