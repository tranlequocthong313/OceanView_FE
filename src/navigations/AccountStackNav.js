import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '~/hooks/useUser';
import {
    DetailsProfileScreen,
    ContactScreen,
    AboutUsScreen,
    ProfileScreen,
    DetailsSettingsScreen,
    ChatScreen,
} from '~/screens';
import LockerScreen from '~/screens/Locker/LockerScreen';
import LockerDetailScreen from '~/screens/Locker/LockerDetailScreen';
import { Fragment } from 'react';
import ReflectionStackNav from './ReflectionStack';

const AccountStack = createNativeStackNavigator();

export default function AccountStackNav() {
    const user = useUser();

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
            {user && user.is_staff && (
                <>
                    <AccountStack.Screen
                        name="LockerScreen"
                        component={LockerScreen}
                        options={{
                            headerTitle: 'Quản lý tủ đồ',
                        }}
                    />
                    <AccountStack.Screen
                        name="LockerDetailScreen"
                        component={LockerDetailScreen}
                        options={({ route }) => {
                            const locker = route.params?.locker;
                            return {
                                title: `${locker?.owner?.resident_id} - ${locker?.owner?.personal_information?.full_name}`,
                            };
                        }}
                    />
                </>
            )}
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
