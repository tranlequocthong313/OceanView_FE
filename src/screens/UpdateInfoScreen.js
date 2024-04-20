import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { Button as ButtonPaper } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import MessageInvalid from '~/components/MessageInvalid';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import theme from '../core/theme';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import passwordValidator from '../helpers/passwordValidator';
// import authAPI, { endpoints } from '../utils/authAPI';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    uploadButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 20,
    },
    upload: {
        minWidth: 100,
        color: theme.colors.surface,
        fontWeight: 'bold',
        marginRight: 16,
    },
});

export default function UpdateInfoScreen({ navigation }) {
    const [newPassword, setNewPassword] = useState({ value: '', error: '' });
    const [retypePassword, setRetypePassword] = useState({ value: '', error: '' });
    const [showInvalidUploadMessage, setShowInvalidUploadMessage] = useState(false);
    const [checkPassword, setCheckPassword] = useState(true);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCloseInvalidUploadMessage = () => {
        setShowInvalidUploadMessage(false);
    };

    const handleCloseCheckPasswordMessage = () => {
        setCheckPassword(true);
    };
    const handleUploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permissions denied!');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) setImage(result.assets[0]);
        }
    };

    // const checkToken = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('accessToken');
    //         if (token !== null) {
    //             // Token exists
    //             console.log('Token found:', token);
    //             // Now you can use the token for further operations
    //         } else {
    //             // Token doesn't exist
    //             console.log('Token not found');
    //         }
    //     } catch (error) {
    //         console.error('Error checking token:', error);
    //     }
    // };
    const onUpdatePressed = async () => {
        const passwordError = passwordValidator(newPassword.value);
        const retypePasswordError = passwordValidator(retypePassword.value);

        if (passwordError || retypePasswordError) {
            setNewPassword({ ...newPassword, error: passwordError });
            setRetypePassword({ ...retypePassword, error: retypePasswordError });
            return;
        }
        if (newPassword.value === retypePassword.value) {
            setCheckPassword(true);
        } else {
            setCheckPassword(false);
            return;
        }

        if (image == null) {
            setShowInvalidUploadMessage(true);
            setLoading(false);
            return;
        }
        console.log(image);

        // try {
        // setLoading(true);

        //     const response = await authAPI.post(endpoints.login, {
        //         password: newPassword.value,
        //         avatar: image.uri,
        //     });
        // } catch (error) {
        //     console.error(error);
        //     setLoading(false);
        // }
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'HomeScreen' }],
        // });
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Cập nhật thông tin cá nhân</Header>
            <TextInput
                label="Mật khẩu mới"
                returnKeyType="next"
                value={newPassword.value}
                onChangeText={(text) => setNewPassword({ value: text, error: '' })}
                error={!!newPassword.error}
                errorText={newPassword.error}
            />

            <TextInput
                label="Nhập lại mật khẩu mới"
                returnKeyType="done"
                value={retypePassword.value}
                onChangeText={(text) => setRetypePassword({ value: text, error: '' })}
                error={!!retypePassword.error}
                errorText={retypePassword.error}
                secureTextEntry
            />
            <View style={{ flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginTop: 16 }}>
                <ButtonPaper
                    mode="contained-tonal"
                    icon="file-upload-outline"
                    style={styles.upload}
                    onPress={handleUploadImage}
                >
                    Tải ảnh đại diện
                </ButtonPaper>
                {image ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: image.uri }}
                            style={{ width: 40, height: 40, borderColor: 'black', borderWidth: 1, marginRight: 16 }}
                        />
                        <AntDesign name="closecircleo" size={22} color="black" onPress={() => setImage()} />
                    </View>
                ) : (
                    ''
                )}
            </View>
            {!checkPassword && (
                <MessageInvalid
                    message="Mật khẩu nhập không khớp với nhau. Vui lòng kiểm tra lại!"
                    onClose={handleCloseCheckPasswordMessage}
                />
            )}
            {showInvalidUploadMessage && (
                <MessageInvalid
                    message="Vui lòng tải ảnh đại diện để sử dụng hệ thống!"
                    onClose={handleCloseInvalidUploadMessage}
                />
            )}
            <Button mode="contained" onPress={onUpdatePressed} style={{ marginTop: 24 }}>
                Hoàn tất
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Hoàn tất'}
            </Button>
        </Background>
    );
}
