import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, ToastAndroid } from 'react-native';

import { Button as ButtonPaper } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import MessageInvalid from '~/components/MessageInvalid';
import { authAPI, userApis } from '~/utils/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';
import theme from '~/core/theme';
import TextInput from '~/components/TextInput';
import BackButton from '~/components/BackButton';
import passwordValidator from '~/helpers/passwordValidator';

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
            if (!result.canceled) setImage(result.assets[0]);
        }
    };

    const onUpdatePressed = async () => {
        console.log(newPassword.value);
        console.log(retypePassword.value);
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
            return;
        }
        try {
            setLoading(true);
            const formData = new global.FormData();
            // The image may not have a name, the server requires the image to have enough information to be decoded
            formData.append('avatar', {
                uri: image.uri,
                name: image.filename ?? `avtar.${image.mimeType.split('/')[1]}`,
                type: image.mimeType,
            });
            formData.append('password', newPassword.value);

            const response = await (
                await authAPI()
            ).patch(userApis.activeUser, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                ToastAndroid.showWithGravity('Active account successfully', ToastAndroid.SHORT, ToastAndroid.CENTER);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            } else {
                ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
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
                label="Nhập mật khẩu mới"
                returnKeyType="next"
                value={newPassword.value}
                onChangeText={(text) => setNewPassword({ value: text, error: '' })}
                error={!!newPassword.error}
                errorText={newPassword.error}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
            />
            <TextInput
                label="Nhập lại mật khẩu mới"
                returnKeyType="done"
                value={retypePassword.value}
                onChangeText={(text) => setRetypePassword({ value: text, error: '' })}
                error={!!retypePassword.error}
                errorText={retypePassword.error}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
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
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Hoàn tất'}
            </Button>
        </Background>
    );
}
