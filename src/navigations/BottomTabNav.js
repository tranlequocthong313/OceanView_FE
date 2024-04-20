import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileStackNav from './ProfileStackNav';
import HomeStackNav from './HomeStackNav';
import NotifyStackNav from './NotifyStackNav';

const BottomTab = createBottomTabNavigator();

export default function SettingsTabNav() {
    return (
        <BottomTab.Navigator initialRouteName="HomeTab" screenOptions={{ headerShown: false }}>
            <BottomTab.Screen
                name="HomeTab"
                component={HomeStackNav}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: <Ionicons name="home" color="black" size="24" />,
                }}
            />
            <BottomTab.Screen
                name="NotificationTab"
                component={NotifyStackNav}
                options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: <MaterialCommunityIcons name="bell" color="black" size="24" />,
                    tabBarBadge: 3,
                }}
            />
            <BottomTab.Screen
                name="ProfileTab"
                component={ProfileStackNav}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: <AntDesign name="user" color="black" size="24" />,
                }}
            />
        </BottomTab.Navigator>
    );
}
