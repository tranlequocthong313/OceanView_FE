import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ResidentCardMainScreen, RegisterResidentCardScreen } from '~/screens';

const ResidentCardStack = createNativeStackNavigator();

export default function ResidentCardStackNav() {
    return (
        <ResidentCardStack.Navigator initialRouteName="ResidentCard">
            <ResidentCardStack.Screen
                name="ResidentCard"
                component={ResidentCardMainScreen}
                options={{
                    title: 'Thẻ cư dân',
                }}
            />
            <ResidentCardStack.Screen
                name="RegisterResidentCard"
                component={RegisterResidentCardScreen}
                options={{
                    title: 'Đăng ký thẻ cư dân',
                }}
            />
        </ResidentCardStack.Navigator>
    );
}
