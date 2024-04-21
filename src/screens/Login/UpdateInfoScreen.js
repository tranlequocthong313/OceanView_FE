import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, FormData } from 'react-native';
import { Button as ButtonPaper, TextInput as Input } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import MessageInvalid from '~/components/MessageInvalid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import theme from '../../core/theme';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import passwordValidator from '../../helpers/passwordValidator';
import API, { endpoints } from '../../configs/API';

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
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

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
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) setImage(result.assets[0].uri);
        }
    };

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
        try {
            console.log('image:', image);
            console.log('uri:', image.uri);

            console.log('password:', newPassword.value);
            setLoading(true);
            const token = await AsyncStorage.getItem('accessToken');
            console.log('Token: ', token);

            const formData = new FormData();
            formData.append('avatar', image);
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            const response = await API.patch(endpoints.updateInfo, formData, {
                headers,
            });
            console.log(response.data);
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Cập nhật thông tin cá nhân</Header>
            <TextInput
                secureTextEntry={!showPassword}
                label="Mật khẩu mới"
                returnKeyType="done"
                value={newPassword.value}
                onChangeText={(text) => setNewPassword({ value: text, error: '' })}
                error={!!newPassword.error}
                errorText={newPassword.error}
                right={
                    <Input.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <TextInput
                label="Nhập lại mật khẩu mới"
                returnKeyType="done"
                value={retypePassword.value}
                onChangeText={(text) => setRetypePassword({ value: text, error: '' })}
                error={!!retypePassword.error}
                errorText={retypePassword.error}
                secureTextEntry={!showNewPassword}
                right={
                    <Input.Icon
                        icon={showNewPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                    />
                }
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
                            source={{ uri: image }}
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
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Hoàn tất'}
            </Button>
        </Background>
    );
}
