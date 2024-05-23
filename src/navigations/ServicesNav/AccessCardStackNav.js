import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccessCardMainScreen, RegisterAccessCardScreen } from '~/screens';

const AccessCardStack = createNativeStackNavigator();

export default function AccessCardStackNav() {
    return (
        <AccessCardStack.Navigator initialRouteName="AccessCard">
            <AccessCardStack.Screen
                name="AccessCard"
                component={AccessCardMainScreen}
                options={{
                    title: 'Thẻ ra vào',
                }}
            />
            <AccessCardStack.Screen
                name="RegisterAccessCard"
                component={RegisterAccessCardScreen}
                options={{
                    title: 'Đăng ký thẻ ra vào',
                }}
            />
        </AccessCardStack.Navigator>
    );
}
