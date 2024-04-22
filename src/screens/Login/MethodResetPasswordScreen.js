import { Text, View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import React, { useState } from 'react';
import api, { userApis } from '~/utils/api';
import theme from '~/core/theme';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';

const styles = StyleSheet.create({
    RadioButton: { flexDirection: 'row', alignItems: 'center' },
});

// TODO: Re-design this screen ui
function MethodResetPasswordScreen({ navigation, route }) {
    const { methods } = route.params;

    const [method, setMethod] = useState('phone_number');
    const [submitLoading, setSubmitLoading] = useState(false);

    const getMethodText = (key) => {
        const texts = { phone_number: 'Send otp to your phone', email: 'Send reset password link to your email' };
        return texts[key];
    };

    // TODO: Implement deep linking to open the app after reseting password success with mail method
    const resetPassword = async () => {
        setSubmitLoading(true);
        try {
            if (!(method in methods)) {
                ToastAndroid.showWithGravity('You must choose a method', ToastAndroid.LONG, ToastAndroid.CENTER);
                console.log(`method not allowed ${method}`);
                return;
            }
            let endpoint = userApis.sendResetPasswordOTP;
            let data = {
                phone_number: methods[method],
            };
            if (method === 'email') {
                endpoint = userApis.sendResetPasswordEmail;
                data = {
                    email: methods[method],
                };
            }
            const res = await api.post(endpoint, data);
            console.log(res.data);
            if (res.status === 200) {
                if (method === 'email') {
                    ToastAndroid.showWithGravity(res.data, ToastAndroid.LONG, ToastAndroid.CENTER);
                    navigation.navigate('LoginScreen');
                } else {
                    navigation.navigate('OTPScreen', { phoneNumber: methods[method] });
                }
            } else {
                ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Reset Password</Header>
            {Object.keys(methods).map((m) => (
                <View key={m} style={styles.RadioButton}>
                    <RadioButton
                        value={m}
                        status={method === m ? 'checked' : 'unchecked'}
                        onPress={() => setMethod(m)}
                    />
                    <Text>{getMethodText(m)}</Text>
                </View>
            ))}
            <Button mode="contained" onPress={resetPassword} style={{ marginTop: 16 }}>
                {submitLoading ? <ActivityIndicator color={theme.colors.surface} /> : 'Reset password'}
            </Button>
        </Background>
    );
}

export default MethodResetPasswordScreen;
