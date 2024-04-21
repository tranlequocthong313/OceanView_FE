import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageInvalid from '~/components/MessageInvalid';
import { AntDesign } from '@expo/vector-icons';
import api, { userApis } from '~/utils/api';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import theme from '../core/theme';
import passwordValidator from '../helpers/passwordValidator';
import usernameValidator from '../helpers/usernameValidator';

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    noteWrap: {
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    notes: {
        fontSize: 10,
        margin: 2,
        lineHeight: 14,
    },
});

export default function LoginScreen({ navigation, route }) {
    const [username, setUsername] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [showInvalidLoginMessage, setShowInvalidLoginMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(route.params?.message);
        if (route.params?.message) {
            ToastAndroid.showWithGravity(route.params?.message, ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }, [route.params?.message]);

    const handleCloseInvalidLoginMessage = () => {
        setShowInvalidLoginMessage(false);
    };

    const onLoginPressed = async () => {
        const usernameError = usernameValidator(password.value);
        const passwordError = passwordValidator(password.value);

        if (passwordError || usernameError) {
            setUsername({ ...username, error: usernameError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        try {
            setLoading(true);
            const response = await api.post(userApis.login, {
                username: username.value,
                password: password.value,
            });

            const token = response.data.token.access_token;
            // Lưu trữ token vào AsyncStorage
            await AsyncStorage.setItem('accessToken', token);
            console.log('Token saved:', token);

            console.log('Response:', response.data);
            // Xử lý phản hồi từ server
            navigation.navigate('UpdateInfoScreen');
            setLoading(false);
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'UpdateInfoScreen' }],
            // });
        } catch (error) {
            setLoading(false);
            setShowInvalidLoginMessage(true);
        }
    };

    return (
        <Background>
            <Logo />
            <Header>OceanView</Header>
            <Paragraph>
                Tận hưởng mọi trải nghiệm thú vị khi đến với OceanView
                <AntDesign name="heart" size={14} color="red" />
            </Paragraph>
            <TextInput
                label="Username"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text) => setUsername({ value: text, error: '' })}
                keyboardType="numeric"
                error={!!username.error}
                errorText={username.error}
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed}>
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Login'}
            </Button>
            {showInvalidLoginMessage && (
                <MessageInvalid
                    message="Thông tin đăng nhập không chính xác. Vui lòng thử lại."
                    onClose={handleCloseInvalidLoginMessage}
                />
            )}
            <View style={styles.noteWrap}>
                <Text style={styles.notes}>
                    * Nếu cư dân chưa có tài khoản, vui lòng liên hệ với ban quản trị để được cấp ( SDT: 0398397591 ).
                </Text>
                <Text style={styles.notes}>
                    Bạn cũng có thể nhờ người thân gửi yêu cầu sau khi đăng nhập thành công.
                </Text>
            </View>
        </Background>
    );
}
