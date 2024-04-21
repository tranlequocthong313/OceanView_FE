import React, { useState } from 'react';
import MessageInvalid from '~/components/MessageInvalid';
import api, { userApis } from '~/utils/api';
import { ToastAndroid } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import passwordValidator from '../helpers/passwordValidator';

// TODO: Re-design this screen ui, use useTogglePasswordVisibility hook to implement toggle password visibility
export default function ResetPasswordScreen({ navigation, route }) {
    const { token } = route.params;

    const [newPassword, setNewPassword] = useState({ value: '', error: '' });
    const [retypePassword, setRetypePassword] = useState({ value: '', error: '' });
    const [checkPassword, setCheckPassword] = useState(true);

    const handleCloseCheckPasswordMessage = () => {
        setCheckPassword(true);
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

        try {
            console.log(newPassword.value);
            console.log(retypePassword.value);
            const res = await api.post(`${userApis.resetPassowrd}?token=${token}`, {
                password: newPassword.value,
                confirm_password: retypePassword.value,
            });
            console.log(res.data);
            if (res.status === 401) {
                ToastAndroid.showWithGravity(res.data, ToastAndroid.LONG, ToastAndroid.CENTER);
            } else {
                navigation.navigate('LoginScreen', { message: res.data });
            }
        } catch (error) {
            console.error(error.response.data);
            ToastAndroid.showWithGravity(error.response.data, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Reset password</Header>
            <TextInput
                label="Mật khẩu mới"
                returnKeyType="next"
                value={newPassword.value}
                onChangeText={(text) => setNewPassword({ value: text, error: '' })}
                error={!!newPassword.error}
                errorText={newPassword.error}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry
            />

            <TextInput
                label="Nhập lại mật khẩu mới"
                returnKeyType="done"
                value={retypePassword.value}
                onChangeText={(text) => setRetypePassword({ value: text, error: '' })}
                error={!!retypePassword.error}
                errorText={retypePassword.error}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
            />
            {!checkPassword && (
                <MessageInvalid
                    message="Mật khẩu nhập không khớp với nhau. Vui lòng kiểm tra lại!"
                    onClose={handleCloseCheckPasswordMessage}
                />
            )}
            <Button mode="contained" onPress={onUpdatePressed} style={{ marginTop: 24 }}>
                Hoàn tất
            </Button>
        </Background>
    );
}
