import axios from 'axios';

const HOST = 'https://oceanview-be.onrender.com';

export const endpoints = {
    login: '/users/login/',
    updateInfo: 'users/activate/',
    currentUser: 'users/current/',
};

const authAPI = axios.create({
    baseURL: HOST,
    headers: {
        Authorization: `Bearer...`,
    },
});

export default authAPI;
