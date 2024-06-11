import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationScreen, ListCardScreen } from '~/screens';

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
                name="ListCard"
                component={ListCardScreen}
                options={{
                    title: 'Danh sách thẻ đăng ký',
                }}
            />
        </NotifyStack.Navigator>
    );
}
