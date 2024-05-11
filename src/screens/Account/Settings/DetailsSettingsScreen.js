import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Button, Background, Header, Logo, Paragraph } from '~/components';
import theme from '~/core/theme';

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

function DetailsSettingsScreen() {
    const CELL_COUNT = 6;
    const RESEND_OTP_TIME_LIMIT = 60;
    const resendOtpTimerInterval = useRef(null);

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

    const onResendOtpButtonPress = () => {
        setValue('');
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();
        console.log('todo: Resend OTP');
    };

    useEffect(() => {
        startResendOtpTimer();
        return () => clearInterval(resendOtpTimerInterval.current);
    }, []);

    const handleVerifyOTP = () => {
        if (!value || value.length !== 6) {
            // ToastAndroid.showWithGravity('You must provide a valid OTP', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return;
        }
        console.log(value);
    };
    return (
        <Background>
            <Logo />
            <Header>Verify the OTP Code</Header>
            <Paragraph>Sent to 7687653902</Paragraph>
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
                <Text style={styles.resendCodeText}>Resend Authorisation Code in {resendButtonDisabledTime} sec</Text>
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

export default DetailsSettingsScreen;
