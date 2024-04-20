import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationScreen, DetailsNotifyScreen } from '~/screens';

const NotifyStack = createNativeStackNavigator();

export default function NotifyStackNav() {
    return (
        <NotifyStack.Navigator initialRouteName="Home">
            <NotifyStack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    title: 'Thông báo',
                }}
            />
            <NotifyStack.Screen
                name="Details"
                component={DetailsNotifyScreen}
                options={{
                    title: 'Chi tiết',
                }}
            />
        </NotifyStack.Navigator>
    );
}
