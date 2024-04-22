import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { AntDesign, Feather } from '@expo/vector-icons';
import ProfileStackNav from './AccountStackNav';
import HomeStackNav from './HomeStackNav';
import NotifyStackNav from './NotifyStackNav';

const BottomTab = createMaterialBottomTabNavigator();

export default function SettingsTabNav() {
    return (
        <BottomTab.Navigator
            initialRouteName="HomeTab"
            // activeColor="#f0edf6"
            inactiveColor="#3e2465"
            // barStyle={{ backgroundColor: '#694fad' }}
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name="HomeTab"
                component={HomeStackNav}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }}
            />
            <BottomTab.Screen
                name="NotificationTab"
                component={NotifyStackNav}
                options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />,
                    tabBarBadge: 3,
                }}
            />
            <BottomTab.Screen
                name="ProfileTab"
                component={ProfileStackNav}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color }) => <AntDesign name="user" color={color} size={24} />,
                }}
            />
        </BottomTab.Navigator>
    );
}
