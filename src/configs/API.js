import axios from 'axios';

const HOST = 'https://oceanview-be.onrender.com';

export const endpoints = {
    login: '/users/login/',
    updateInfo: '/users/active/',
    currentUser: '/users/current/',
    reflection: 'uses/reflection/',
};

export const authApi = (accessToken) =>
    axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    });

export default axios.create({
    baseURL: HOST,
});
