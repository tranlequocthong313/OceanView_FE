import React, {  useState } from 'react';
import api, { userApis } from '~/utils/api';
import { Background, BackButton, Logo, Header, TextInput, Button } from '~/components';
import theme from '~/core/theme';
import { ActivityIndicator } from 'react-native-paper';

export default function ForgotPasswordScreen({ navigation }) {
    const [userIdentifier, setUserIdentifier] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);

    const sendResidentId = async () => {
        if (userIdentifier.value) {
            setLoading(true);
            try {
                const res = await api.post(userApis.methodResetPassword, { user_identifier: userIdentifier.value });
                const methods = res.data;

                // console.log(methods);
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
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Thông tin tài khoản</Header>
            <TextInput
                label="Email hoặc Số điện thoại"
                returnKeyType="done"
                value={userIdentifier.value}
                onChangeText={(text) => setUserIdentifier({ value: text, error: '' })}
                error={!!userIdentifier.error}
                errorText={userIdentifier.error}
                autoCapitalize="none"
            />
            <Button mode="contained" onPress={sendResidentId} style={{ marginTop: 16 }}>
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Tiếp tục'}
            </Button>
        </Background>
    );
}
