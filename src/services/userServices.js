import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/users';

// Function to fetch all users
export const getAllUsers = async() => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

// Function to fetch user details by ID
export const getUserById = async(userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

// Function to create a new user
export const createUser = async(userData) => {
    try {
        const response = await axios.post(API_BASE_URL, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async(userId, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Function to delete a user by ID
export const deleteUserById = async(userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};