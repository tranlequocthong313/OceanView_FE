import { Text, View, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import React, { useState } from 'react';
import api, { userApis } from '~/utils/api';
import theme from '~/core/theme';
import { BackButton, Background, Logo, Header } from '~/components';

const styles = StyleSheet.create({
    RadioButton: { flexDirection: 'row', alignItems: 'center' },
});

function MethodResetPasswordScreen({ navigation, route }) {
    const { methods } = route.params;
    console.log(methods);
    const [method, setMethod] = useState('phoneNumber');
    const [submitLoading, setSubmitLoading] = useState(false);

    const { email, phoneNumber } = methods;
    const hiddenPhoneNumber = phoneNumber.replace(/.(?=.{4})/g, '*');

    const hiddenEmail = email.replace(/^(.{2}).*?@/, '$1******@');

    const getMethodText = (key) => {
        const texts = {
            email: `Send reset password link to your email (${hiddenEmail})`,
            phoneNumber: `Send otp to your phone (${hiddenPhoneNumber})`,
        };
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
                phoneNumber: methods[method],
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
            <View>
                {Object.keys(methods)
                    .reverse()
                    .map((m) => (
                        <View key={m} style={styles.RadioButton}>
                            <RadioButton
                                value={m}
                                status={method === m ? 'checked' : 'unchecked'}
                                onPress={() => setMethod(m)}
                            />
                            <Text>{getMethodText(m)}</Text>
                        </View>
                    ))}
            </View>
            <Button mode="contained" onPress={resetPassword} style={{ marginTop: 16 }}>
                {submitLoading ? <ActivityIndicator color={theme.colors.surface} /> : 'Reset password'}
            </Button>
        </Background>
    );
}

export default MethodResetPasswordScreen;
