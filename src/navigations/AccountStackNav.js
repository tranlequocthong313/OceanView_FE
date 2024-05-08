import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    DetailsProfileScreen,
    SettingsScreen,
    ContactScreen,
    AboutUsScreen,
    ProfileScreen,
    DetailsSettingsScreen,
    ChatScreen,
    CreateReflectionScreen,
} from '~/screens';

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
            <AccountStack.Screen
                name="Reflection"
                component={CreateReflectionScreen}
                options={{
                    headerTitle: 'Tạo phản ánh mới',
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
