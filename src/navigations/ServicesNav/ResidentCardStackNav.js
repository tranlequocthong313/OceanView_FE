import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ResidentCardMainScreen,
    RegisterResidentCardScreen,
    CancelResidentCardScreen,
    ReissueResidentCardScreen,
} from '~/screens';

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
            <ResidentCardStack.Screen
                name="CancelResidentCard"
                component={CancelResidentCardScreen}
                options={{
                    title: 'Huỷ thẻ cư dân',
                }}
            />
            <ResidentCardStack.Screen
                name="ReissueResidentCard"
                component={ReissueResidentCardScreen}
                options={{
                    title: 'Cấp lại thẻ cư dân',
                }}
            />
        </ResidentCardStack.Navigator>
    );
}
