import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ServicesScreen,
 
} from '~/screens';
import ParkingCardStack from './ParkingCardStackNav';
import AccessCardStack from './AccessCardStackNav';
import ResidentCardStack from './ResidentCardStackNav';

const ServiceStack = createNativeStackNavigator();

export default function ServiceStackNav() {
    return (
        <ServiceStack.Navigator initialRouteName="Services" screenOptions={{ headerShown: false }}>
            <ServiceStack.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    title: 'Dịch vụ',
                    headerShown: true,
                }}
            />
            <ServiceStack.Screen
                name="ParkingCardMain"
                component={ParkingCardStack}
                options={{
                    title: 'Thẻ giữ xe',
                }}
            />
            <ServiceStack.Screen
                name="AccessCardMain"
                component={AccessCardStack}
                options={{
                    title: 'Thẻ ra vào',
                }}
            />
            <ServiceStack.Screen
                name="ResidentCardMain"
                component={ResidentCardStack}
                options={{
                    title: 'Thẻ cư dân',
                }}
            />
        </ServiceStack.Navigator>
    );
}
