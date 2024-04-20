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

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNav() {
    return (
        <ProfileStack.Navigator initialRouteName="Profile">
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Tài khoản',
                }}
            />
            <ProfileStack.Screen
                name="DetailsProfile"
                component={DetailsProfileScreen}
                options={{
                    title: 'Thông tin cá nhân',
                }}
            />
            <ProfileStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerTitle: 'Cài đặt',
                }}
            />
            <ProfileStack.Screen
                name="DetailsSettings"
                component={DetailsSettingsScreen}
                options={{
                    headerTitle: 'Cài đặt',
                }}
            />
            <ProfileStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    headerTitle: 'Liên hệ',
                }}
            />
            <ProfileStack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerTitle: 'Chat với ban quản trị',
                }}
            />
            <ProfileStack.Screen
                name="AboutUs"
                component={AboutUsScreen}
                options={{
                    headerTitle: 'Về chúng tôi',
                }}
            />
        </ProfileStack.Navigator>
    );
}
