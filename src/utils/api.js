import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    refreshToken: '/users/refresh-token/',
};

export const serviceApis = {
    accessCard: '/services/access-cards/',
    parkingCard: '/services/parking-cards/',

    feedback: '/feedbacks/',
};

export const feedbackApis = {
    feedbackPost: '/feedbacks/',
};

export const lockerApis = {
    lockers: '/lockers/',
    lockerDetail: (lockerId) => `/lockers/${lockerId}/items/`,
    itemPost: (lockerId) => `/lockers/${lockerId}/items/`,
    itemDetail: (lockerId, itemId) => `/lockers/${lockerId}/items/${itemId}/`,
    itemEdit: (lockerId, itemId) => `/lockers/${lockerId}/items/${itemId}/`,
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

const refreshToken = async (error) => {
    console.log(error.response.data);
    console.log(error.response.status);
    if (
        error.response.status === 400 &&
        error.response.data.message.includes('The ID Token is expired, revoked, malformed, or otherwise invalid.')
    ) {
        const token = await AsyncStorage.getItem('refreshToken');
        console.log('Token: ', refreshToken);
        const res = await api.post(userApis.refreshToken, { token });
        await AsyncStorage.setItem('accessToken', res.data.access_token);
        await AsyncStorage.setItem('refreshToken', res.data.refresh_token);
        console.log('Refreshed token successfully');
    }
};

// TODO: Intercept responses to refresh password
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        refreshToken(error);
        return Promise.reject(error);
    },
);

export default api;
