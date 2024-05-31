import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, notificationApis } from '~/utils/api';
import { FCM_TOKEN_KEY } from '~/utils/constants';

async function saveTokenToDatabase(token) {
    const storedToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);
    console.log(`Token::: ${token}`);
    console.log(`StoredToken::: ${storedToken}`);
    if (token !== storedToken) {
        const r = await (
            await authAPI()
        ).post(notificationApis.fcmToken, {
            token,
            device_type: 'ANDROID',
        });
        if (r.status === 201) {
            await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
        }
    }
}

export default saveTokenToDatabase;
