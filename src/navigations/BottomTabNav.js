import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import ProfileStackNav from './ProfileStackNav';
import HomeStackNav from './HomeStackNav';
import NotifyStackNav from './NotifyStackNav';

const BottomTab = createBottomTabNavigator();

export default function SettingsTabNav() {
    return (
        <BottomTab.Navigator initialRouteName="HomeTab" screenOptions={{ headerShown: false}}>
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
