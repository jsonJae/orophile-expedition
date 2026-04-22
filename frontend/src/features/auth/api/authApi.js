import apiClient from '../../../services/axiosConfig.js';

const authApi = {
    login: async(email , password) => {
        const response = await apiClient.post('auth/login', { email, password });
        return response.data
    },

    register: async(newUser) => {
        const response = await apiClient.post('auth/register', newUser);
        return response.data
    }
}

export default authApi;