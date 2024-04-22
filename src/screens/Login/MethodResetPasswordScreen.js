// import { Text, View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import api, { userApis } from '~/utils/api';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';

const styles = StyleSheet.create({
    RadioButton: { flexDirection: 'row', alignItems: 'center' },
});

// TODO: Re-design this screen ui
function MethodResetPasswordScreen({ navigation, route }) {
    const { residentId } = route.params;

    const [method, setMethod] = useState('sms');
    const [methods, setMethods] = useState({ value: [], error: '' });
    const [loading, setLoading] = useState(false);

    const getMethodText = (key) => {
        const texts = { sms: 'Send otp to your phone', email: 'Send reset password link to your email' };
        return texts[key];
    };

    useEffect(() => {
        const getMethods = async () => {
            setLoading(true);
            try {
                const res = await api.get(userApis.methodResetPassword(residentId));
                setMethods({ value: res.data?.methods, error: '' });
            } catch (error) {
                setMethods({ value: [], error });
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getMethods();
    }, [residentId]);

    // TODO: Implement deep linking to open the app after reseting password success with mail method
    // const resetPassword = async () => {
    //     try {
    //         if (!methods.value.includes(method)) {
    //             ToastAndroid.showWithGravity('You must choose a method', ToastAndroid.LONG, ToastAndroid.CENTER);
    //             console.log(`method not allowed ${method}`);
    //             return;
    //         }
    //         let endpoint = userApis.sendResetPasswordOTP(residentId);
    //         if (method === 'email') {
    //             endpoint = userApis.sendResetPasswordEmail(residentId);
    //         }
    //         const res = await api.post(endpoint);
    //         console.log(res.data);
    //         if (res.status === 200) {
    //             if (method === 'email') {
    //                 navigation.navigate('LoginScreen', { message: res.data });
    //             } else {
    //                 navigation.navigate('OTPScreen', { residentId });
    //             }
    //         } 
    //         // else {
    //         //     ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.CENTER);
    //         // }
    //     } catch (ex) {
    //         console.error(ex);
    //     }
    // };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Reset Password</Header>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    {methods.value.map((m) => (
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
                        Reset password
                    </Button>
                </>
            )}
        </Background>
    );
}

export default MethodResetPasswordScreen;
