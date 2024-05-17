import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { Text, TextInput as Input } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import api, { userApis } from '~/utils/api';
import { Background, Logo, Header, Paragraph, Button, TextInput, MessageInvalid } from '~/components';
import { passwordValidator, formValidator } from '~/helpers';
import { useUserDispatch } from '~/hooks/useUser';
import { USER_ACTION_TYPE } from '~/reducers/userReducer';
import theme from '../../core/theme';

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
        color: theme.colors.third,
    },
    notes: {
        fontSize: 10,
        margin: 2,
        lineHeight: 14,
    },
    toggleButton: {
        marginTop: 5,
        color: theme.colors.secondary,
        textDecorationLine: 'underline',
    },
});

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState({ value: '240002', error: '' });
    const [password, setPassword] = useState({ value: 'minhha2k3', error: '' });

    const [showInvalidLoginMessage, setShowInvalidLoginMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const userDispatch = useUserDispatch();

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

            const response = await api.post(userApis.login, {
                username: username.value,
                password: password.value,
                // username: '240002',
                // password: 'minhha2k3',
            });
            if (response.status === 200) {
                const token = response.data.token.access_token;
                const refreshToken = response.data.token.refresh_token;
                const { status } = response.data;

                // Lưu trữ token vào AsyncStorage
                await AsyncStorage.setItem('accessToken', token);
                await AsyncStorage.setItem('refreshToken', refreshToken);

                // console.log(token);
                // console.log(status);
                console.log('Response:', response.data);
                userDispatch({
                    type: USER_ACTION_TYPE.LOGIN,
                    payload: response.data,
                });
                if (status === 'ACTIVE') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
                } else if (status === 'ISSUED') {
                    navigation.navigate('UpdateInfoScreen');
                } else {
                    const messages = {
                        NOT_ISSUED_YET: 'Account is not issued yet',
                        BANNED: 'You are banned',
                    };
                    ToastAndroid.showWithGravity(messages[status], ToastAndroid.LONG, ToastAndroid.CENTER);
                }
            } else {
                ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setShowInvalidLoginMessage(true);
        } finally {
            setLoading(false);
        }
    };

    // TODO: Chuyển cái Logo Header Paragraph này thành 1 Compoent, rồi sau đó tất cả Screen liên quan đếnLogin, ForgotPassword dều là children của Component này => Tránh duplicate code
    return (
        <Background>
            <Logo />
            <Header>OceanView</Header>
            <Paragraph>
                Tận hưởng mọi trải nghiệm thú vị khi đến với OceanView
                <AntDesign name="heart" size={14} color="red" />
            </Paragraph>
            <TextInput
                label="Mã cư dân"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text) => setUsername({ value: text, error: '' })}
                keyboardType="numeric"
                error={!!username.error}
                maxLength={6}
            />
            {username.error ? <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{username.error}</Text> : null}

            <TextInput
                secureTextEntry={!showPassword}
                label="Mật khẩu"
                returnKeyType="next"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                right={
                    <Input.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
            />
            {password.error ? <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{password.error}</Text> : null}

            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgot}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed}>
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Đăng nhập'}
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
