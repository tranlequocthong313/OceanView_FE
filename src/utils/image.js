import * as ImagePicker from 'expo-image-picker';

export default async function handleUploadImage(callback) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permissions denied!');
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            callback(result.assets[0]);
        }
    }
}
