import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
// import { Text, View, TouchableOpacity } from 'react-native';


import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import api, { userApis } from '~/utils/api';
import theme from '~/core/theme';
import { Button, Background, Header, Logo, Paragraph, BackButton } from '~/components';

export const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: 40,
        width: '90%',
        marginLeft: 20,
        marginRight: 20,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },

    resendCode: {
        color: theme.colors.third,
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeText: {
        marginStart: 20,
        marginTop: 40,
    },
    resendCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

function OTPScreen({ navigation, route }) {
    const CELL_COUNT = 6;
    const RESEND_OTP_TIME_LIMIT = 60;

    const resendOtpTimerInterval = useRef(null);

    const { phoneNumber } = route.params;

    const hiddenPhoneNumber = phoneNumber.replace(/.(?=.{4})/g, '*');

    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(RESEND_OTP_TIME_LIMIT);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval.current) {
            console.log(resendOtpTimerInterval.current);
            clearInterval(resendOtpTimerInterval.current);
        }
        resendOtpTimerInterval.current = setInterval(() => {
            setResendButtonDisabledTime((prev) => (prev <= 0 ? 0 : prev - 1));
        }, 1000);
    };


    const onResendOtpButtonPress = async () => {
        setValue('');
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();
        try {
            await api.post(userApis.sendResetPasswordOTP, { phone_number: phoneNumber });
            console.log('todo: Resend OTP');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        startResendOtpTimer();
        return () => clearInterval(resendOtpTimerInterval.current);
    }, []);

    const handleVerifyOTP = async () => {
        try {
            if (!value || value.length !== 6) {
                ToastAndroid.showWithGravity('You must provide a valid OTP', ToastAndroid.SHORT, ToastAndroid.CENTER);
                return;
            }
            const res = await api.post(userApis.verifyOTP, {
                phone_number: phoneNumber,
                otp: value,
            });
            console.log(res.data);
            if (res.status === 401) {
                ToastAndroid.showWithGravity(res.data, ToastAndroid.LONG, ToastAndroid.CENTER);
                setValue('');
            } else {
                navigation.navigate('ResetPasswordScreen', { token: res.data?.token });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Verify the OTP Code</Header>
            <Paragraph>Sent to {hiddenPhoneNumber}</Paragraph>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                    >
                        <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                    </View>
                )}
            />
            {resendButtonDisabledTime > 0 ? (
                <Text style={styles.resendCodeText}>Resend OTP Code in {resendButtonDisabledTime} sec</Text>
            ) : (
                <TouchableOpacity onPress={onResendOtpButtonPress}>
                    <View style={styles.resendCodeContainer}>
                        <Text style={styles.resendCode}>Resend Authorisation Code </Text>
                        <Text style={{ marginTop: 40 }}>in {resendButtonDisabledTime} sec</Text>
                    </View>
                </TouchableOpacity>
            )}
            <Button mode="contained" onPress={handleVerifyOTP}>
                Submit
            </Button>
        </Background>
    );
}

export default OTPScreen;
