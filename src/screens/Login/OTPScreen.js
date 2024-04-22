import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, ToastAndroid } from 'react-native';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import api, { userApis } from '~/utils/api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

// TODO: Create a standard OTP form style
function OTPScreen({ navigation, route }) {
    const { residentId } = route.params;

    const [otp, setOTP] = useState('');

    const handleOTPChange = (text) => {
        setOTP(text);
    };

    // const handleVerifyOTP = async () => {
    //     try {
    //         if (!otp || otp.length !== 6) {
    //             ToastAndroid.showWithGravity('You must provide a valid OTP', ToastAndroid.SHORT, ToastAndroid.CENTER);
    //             return;
    //         }
    //         const res = await api.post(userApis.verifyOTP, {
    //             resident_id: residentId,
    //             otp,
    //         });
    //         console.log(res.data);
    //         if (res.status === 401) {
    //             ToastAndroid.showWithGravity(res.data, ToastAndroid.LONG, ToastAndroid.CENTER);
    //             setOTP('');
    //         } else {
    //             navigation.navigate('ResetPasswordScreen', { token: res.data?.token });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nhập mã OTP</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Nhập mã OTP"
                value={otp}
                onChangeText={handleOTPChange}
                maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
}

export default OTPScreen;
