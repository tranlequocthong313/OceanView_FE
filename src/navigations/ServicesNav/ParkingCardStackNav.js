import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ParkingCardMainScreen,
    RegisterParkingCardScreen,
    CancelParkingCardScreen,
    ReissueParkingCardScreen,
} from '~/screens';

const ParkingCardStack = createNativeStackNavigator();

export default function ParkingCardStackNav() {
    return (
        <ParkingCardStack.Navigator initialRouteName="ParkingCard">
            <ParkingCardStack.Screen
                name="ParkingCard"
                component={ParkingCardMainScreen}
                options={{
                    title: 'Thẻ giữ xe',
                }}
            />
            <ParkingCardStack.Screen
                name="RegisterParkingCard"
                component={RegisterParkingCardScreen}
                options={{
                    title: 'Đăng ký thẻ giữ xe',
                }}
            />
            <ParkingCardStack.Screen
                name="CancelParkingCard"
                component={CancelParkingCardScreen}
                options={{
                    title: 'Huỷ thẻ giữ xe',
                }}
            />
            <ParkingCardStack.Screen
                name="ReissueParkingCard"
                component={ReissueParkingCardScreen}
                options={{
                    title: 'Cấp lại thẻ giữ xe',
                }}
            />
        </ParkingCardStack.Navigator>
    );
}
