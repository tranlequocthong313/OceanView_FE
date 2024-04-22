import React, { useState } from 'react';
import Background from '~/components/Background';
import BackButton from '~/components/BackButton';
import Logo from '~/components/Logo';
import Header from '~/components/Header';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import theme from '~/core/theme';
import { ActivityIndicator } from 'react-native-paper';
import api, { userApis } from '~/utils/api';

export default function ForgotPasswordScreen({ navigation }) {
    const [userIdentifier, setUserIdentifier] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);

    const sendResidentId = async () => {
        if (userIdentifier.value) {
            setLoading(true);
            try {
                const res = await api.post(userApis.methodResetPassword, { user_identifier: userIdentifier.value });
                const methods = res.data;
                navigation.navigate('MethodResetPasswordScreen', { methods });
            } catch (error) {
                console.error(error);
                setUserIdentifier({ value: userIdentifier.value, error: 'Input invalid' });
            } finally {
                setLoading(false);
            }
        } else {
            setUserIdentifier({ ...userIdentifier, error: 'User identifier invalid' });
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
            <TextInput
                label="User identifier"
                returnKeyType="done"
                value={userIdentifier.value}
                onChangeText={(text) => setUserIdentifier({ value: text, error: '' })}
                error={!!userIdentifier.error}
                errorText={userIdentifier.error}
                autoCapitalize="none"
            />
            <Button mode="contained" onPress={sendResidentId} style={{ marginTop: 16 }}>
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Send user identifier'}
            </Button>
        </Background>
    );
}
