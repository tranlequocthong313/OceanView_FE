import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    DetailsProfileScreen,
    SettingsScreen,
    ContactScreen,
    AboutUsScreen,
    ProfileScreen,
    DetailsSettingsScreen,
    ChatScreen,
} from '~/screens';
import ReflectionStackNav from './FeedbackStack';

const AccountStack = createNativeStackNavigator();

export default function AccountStackNav() {
    return (
        <AccountStack.Navigator initialRouteName="Profile">
            <AccountStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Tài khoản',
                }}
            />
            <AccountStack.Screen
                name="DetailsProfile"
                component={DetailsProfileScreen}
                options={{
                    title: 'Thông tin cá nhân',
                }}
            />
            <AccountStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerTitle: 'Cài đặt',
                }}
            />
            <AccountStack.Screen
                name="DetailsSettings"
                component={DetailsSettingsScreen}
                options={{
                    headerTitle: 'Chi tiết cài đặt',
                    headerShown: false,
                }}
            />
            <AccountStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    headerTitle: 'Liên hệ',
                }}
            />
            {/* TODO: Move this outta here */}
            <AccountStack.Screen
                name="HistoryReflection"
                component={ReflectionStackNav}
                options={{
                    headerTitle: 'Danh sách phản ánh',
                }}
            />
            <AccountStack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerTitle: 'Chat với ban quản trị',
                }}
            />
            <AccountStack.Screen
                name="AboutUs"
                component={AboutUsScreen}
                options={{
                    headerTitle: 'Về chúng tôi',
                }}
            />
        </AccountStack.Navigator>
    );
}
