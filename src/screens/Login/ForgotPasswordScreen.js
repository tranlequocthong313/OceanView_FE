import React, { useState } from 'react';
import residentIdValidator from '~/helpers/residentIdValidator';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

export default function ForgotPasswordScreen({ navigation }) {
    const [residentId, setResidentId] = useState({ value: '', error: '' });

    const sendResidentId = () => {
        const isValid = residentIdValidator(residentId.value);
        if (isValid) {
            navigation.navigate('MethodResetPasswordScreen', { residentId: residentId.value });
        } else {
            setResidentId({ ...residentId, error: 'Resident is invalid' });
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
            <TextInput
                label="Resident ID"
                returnKeyType="done"
                value={residentId.value}
                onChangeText={(text) => setResidentId({ value: text, error: '' })}
                error={!!residentId.error}
                errorText={residentId.error}
                autoCapitalize="none"
                maxLength={6}
            />
            <Button mode="contained" onPress={sendResidentId} style={{ marginTop: 16 }}>
                Send Resident ID
            </Button>
        </Background>
    );
}