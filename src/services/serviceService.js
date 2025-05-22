import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/services'; // Replace with your actual API base URL

// Function to fetch all services
export const getAllServices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`)
        return response;
    } catch (error) {
        console.error("Error fetching all services: ", error)
        throw error;
    }
}

// Function to fetch services by user ID
export const getServicesByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Function to create a service
export const createService = async (service) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`,
            { service }, { headers: { 'Content-Type': 'application/json' } }
        )
        return response;
    } catch (error) {
        console.error('Error in creation of service: ', error)
        throw error;
    }
}

// Function to update service state
export const updateServiceState = async (serviceId, newState) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`,
            { id: serviceId, id_estado: newState }, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Error updating service state:', error);
        throw error;
    }
};

//Function to get all service clasifications
export const getAllServiceClasifications = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/clasifications`)
        return response
    } catch (error) {
        console.error("Error getting all clasifications: ", error)
        throw error;
    }
}

//Function to get all service subclasifications
export const getAllServiceSubclasification = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subclasifications`)
        return response
    } catch (error) {
        console.error("Error getting all service subclasifications: ", error)
        throw error
    }
}

// Function to delete a service
export const deleteService = async (id) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/${id}`)
        return response
    }catch(error){
        console.error("Error deleting service: ", error)
        throw error
    }
}