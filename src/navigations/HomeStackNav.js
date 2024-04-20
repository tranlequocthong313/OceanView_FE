import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '~/screens';
import ServiceStackNav from './ServicesStack';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNav() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="ServiceScreen"
                component={ServiceStackNav}
                options={{
                    title: 'Dịch vụ',
                    headerShown: false,
                }}
            />
        </HomeStack.Navigator>
    );
}
