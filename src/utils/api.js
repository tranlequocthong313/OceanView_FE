import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const HOST = 'https://oceanview-be.onrender.com';
const HOST = 'https://oceanview-be.onrender.com';

export const userApis = {
    login: '/users/login/',
    activeUser: '/users/active/',
    currentUser: '/users/current/',
    methodResetPassword: '/users/forgot-password/',
    sendResetPasswordOTP: '/users/otp/',
    sendResetPasswordEmail: '/users/email/',
    verifyOTP: '/users/otp-verification/',
    resetPassword: '/users/password/',
};

export const serviceApis = {
    accessCard: '/services/access-cards/',
};

export const feedbackApis = {
    feedbackPost: '/feedbacks/',
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

// TODO: Intercept responses to refresh password

export default api;
