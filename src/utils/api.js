import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const HOST = 'https://oceanview-be.onrender.com';
const HOST = 'https://oceanview-be.onrender.com';

export const userApis = {
    login: '/users/login/',
    activeUser: `/users/active/`,
    currentUser: '/users/current/',
    sendResetPasswordOTP: `/users/send-otp/`,
    sendResetPasswordEmail: `/users/send-reset-password-link/`,
    methodResetPassword: `/users/forgot-password/`,
    verifyOTP: `/users/verify-otp/`,
    resetPassword: `/users/reset-password/`,
};

export const authAPI = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Token: ', token);

    return axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const api = axios.create({
    baseURL: HOST,
});

export default api;
