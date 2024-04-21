import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, TextInput as Input } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageInvalid from '~/components/MessageInvalid';
import { AntDesign } from '@expo/vector-icons';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import theme from '../../core/theme';
import passwordValidator from '../../helpers/passwordValidator';
import formValidator from '../../helpers/formValidator';
import API, { endpoints } from '../../configs/API';

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
    },
    toggleButton: {
        marginTop: 5,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [showInvalidLoginMessage, setShowInvalidLoginMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseInvalidLoginMessage = () => {
        setShowInvalidLoginMessage(false);
    };

    const [showPassword, setShowPassword] = useState(false);

    const onLoginPressed = async () => {
        const usernameError = formValidator(username.value, 'Username');
        const passwordError = passwordValidator(password.value);

        if (passwordError || usernameError) {
            setUsername({ ...username, error: usernameError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        try {
            setLoading(true);
            const response = await API.post(endpoints.login, {
                // username: username.value,
                // password: password.value,
                username: '240003',
                password: 'MsAbHHdDXK',
            });

            const token = response.data.token.access_token;
            const { status } = response.data;

            // Lưu trữ token vào AsyncStorage
            await AsyncStorage.setItem('accessToken', token);

            console.log(token);
            console.log(status);
            console.log('Response:', response.data);

            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });

            // if (status === 'ACTIVE') {
            //     navigation.reset({
            //         index: 0,
            //         routes: [{ name: 'HomeScreen' }],
            //     });
            // } else {
            //     navigation.navigate('UpdateInfoScreen');
            //     setLoading(false);
            // }
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
                secureTextEntry={!showPassword}
                label="Password"
                returnKeyType="next"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                right={
                    <Input.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
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
