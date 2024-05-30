import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI, notificationApis } from "~/utils/api";

async function saveTokenToDatabase(token) {
    const storedToken = await AsyncStorage.getItem('fcmToken');
    console.log(`Token: ${token}`);
    console.log(`StoredToken: ${storedToken}`);
    if (token !== storedToken) {
        const r = await (await authAPI()).post(notificationApis.fcmToken, {
            token,
            device_type: 'ANDROID'
        })
        if (r.status === 201) {
            await AsyncStorage.setItem('fcmToken', token);
        }
    }
}

export default saveTokenToDatabase
