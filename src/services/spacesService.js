import { accordionSummaryClasses } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/spaces'; // Replace with your actual API base URL

export const getAllSpaces = async () => {
    try {
        const response = await axios.get(API_BASE_URL)
        return response
    } catch (error) {
        console.error('Error fetching spaces:', error);
        throw error;
    }
}

export const updateSpaceState = async (id_espacio, state) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`,
            { id: id_espacio, id_estado: state },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
    } catch (error) {
        console.error('error updating space: ', error)
        throw error;
    }
}

export const createSpace = async (space) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, { space },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        return response
    } catch (error) {
        console.error("Error creating space: ", error)
        throw error
    }
}

export const deleteSpace = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`)
        return response
    } catch (error) {
        console.error("Error deleting space: ", error)
        throw error
    }
}

export const getSpaceById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`)
        return response
    } catch (error) {
        console.error("Error fetching space: ", error)
        throw error
    }
}

export const getSpaceStates = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/spaceStates`)
        return response.data
    } catch (error) {
        console.error("error fetching space states: ", error)
        throw error
    }
}

export const updateSpaceInfo = async (spaceInfo, id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/updateSpace/${id}`, spaceInfo,
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response
    } catch (error) {
        console.error("error updating space info: ", error)
        throw error
    }
}