import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

const HOST = 'https://oceanview-be.onrender.com';

export const userApis = {
    login: '/users/login/',
    logout: '/users/logout/',
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
    residentCard: '/services/resident-cards/',

    listCard: '/services/',
    deleteCard: '/services/',
    reissueCard: '/services/',
};

// TODO: Dung feedback apis ro rang

export const feedbackApis = {
    feedbacks: '/feedbacks/',
    feedbackDel: '/feedbacks/',
    feedbackPost: '/feedbacks/',
    feedbackPatch: '/feedbacks/',
};

export const invoiceApis = {
    invoice: '/invoices/',
};

export const lockerApis = {
    lockers: '/lockers/',
    lockerDetail: (lockerId) => `/lockers/${lockerId}/items/`,
    itemPost: (lockerId) => `/lockers/${lockerId}/items/`,
    itemDetail: (lockerId, itemId) => `/lockers/${lockerId}/items/${itemId}/`,
    itemEdit: (lockerId, itemId) => `/lockers/${lockerId}/items/${itemId}/`,
};

export const notificationApis = {
    notifications: '/notifications/',
    readNotification: '/notifications/read/',
    fcmToken: '/fcm-tokens/',
};

export const authAPI = async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
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

// TODO: check if this interception really working
const refreshToken = async (error) => {
    console.log(error.response.data);
    console.log(error.response.status);
    if (
        error.response.status === 400 &&
        error.response.data.message.includes('The ID Token is expired, revoked, malformed, or otherwise invalid.')
    ) {
        const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
        console.log('Token: ', refreshToken);
        const res = await api.post(userApis.refreshToken, { token });
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token);
        console.log('Refreshed token successfully');
    }
};

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        refreshToken(error);
        return Promise.reject(error);
    },
);

export default api;
