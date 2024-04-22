import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    AccessCardMainScreen,
    RegisterParkingCardScreen,
    CancelParkingCardScreen,
    ReissueParkingCardScreen,
} from '~/screens';

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
                name="RegisterParkingCard"
                component={RegisterParkingCardScreen}
                options={{
                    title: 'Đăng ký thẻ ra vào',
                }}
            />
            <AccessCardStack.Screen
                name="CancelParkingCard"
                component={CancelParkingCardScreen}
                options={{
                    title: 'Huỷ thẻ ra vào',
                }}
            />
            <AccessCardStack.Screen
                name="ReissueParkingCard"
                component={ReissueParkingCardScreen}
                options={{
                    title: 'Cấp lại thẻ ra vào',
                }}
            />
        </AccessCardStack.Navigator>
    );
}
