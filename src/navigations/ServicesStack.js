import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    RegisterAccessCardScreen,
    RegisterParkingCardScreen,
    RegisterRelativeAccountScreen,
    ServicesScreen,
} from '~/screens';

const ServiceStack = createNativeStackNavigator();

export default function ServiceStackNav() {
    return (
        <ServiceStack.Navigator initialRouteName="Services">
            <ServiceStack.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    title: 'Dịch vụ',
                }}
            />
            <ServiceStack.Screen
                name="RegisterParkingCard"
                component={RegisterParkingCardScreen}
                options={{
                    title: 'Đăng ký thẻ giữ xe',
                }}
            />
            <ServiceStack.Screen
                name="RegisterAccessCard"
                component={RegisterAccessCardScreen}
                options={{
                    title: 'Đăng ký thẻ ra vào',
                }}
            />
            <ServiceStack.Screen
                name="RegisterRelativeAccount"
                component={RegisterRelativeAccountScreen}
                options={{
                    title: 'Đăng ký cấp phát tài khoản cho người thân',
                }}
            />
        </ServiceStack.Navigator>
    );
}
