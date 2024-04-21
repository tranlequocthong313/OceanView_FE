import axios from 'axios';

const HOST = 'https://oceanview-be.onrender.com';

export const userApis = {
    login: '/users/login/',
    updateInfo: 'users/activate/',
    currentUser: 'users/current/',
    sendResetPasswordOTP: (residentId) => `users/${residentId}/send-otp/`,
    sendResetPasswordEmail: (residentId) => `users/${residentId}/send-reset-password-link/`,
    methodResetPassword: (residentId) => `users/${residentId}/forgot-password/`,
    verifyOTP: `users/verify-otp/`,
    resetPassowrd: `users/reset-password/`,
};

export const authAPI = axios.create({
    baseURL: HOST,
    headers: {
        Authorization: `Bearer...`,
    },
});

const api = axios.create({
    baseURL: HOST,
});

export default api;
