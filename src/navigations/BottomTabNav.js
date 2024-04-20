import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileStackNav from './ProfileStackNav';
import HomeStackNav from './HomeStackNav';
import NotifyStackNav from './NotifyStackNav';

const BottomTab = createBottomTabNavigator();

function TabarIcon({ color, size, name = 'home' }) {
    const icons = {
        home: <Ionicons name="home" color={color} size={size} />,
        bell: <MaterialCommunityIcons name="bell" color={color} size={size} />,
        user: <AntDesign name="user" color={color} size={size} />,
    };

    return icons[name];
}

export default function SettingsTabNav() {
    return (
        <BottomTab.Navigator initialRouteName="HomeTab" screenOptions={{ headerShown: false }}>
            <BottomTab.Screen
                name="HomeTab"
                component={HomeStackNav}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: TabarIcon,
                }}
            />
            <BottomTab.Screen
                name="NotificationTab"
                component={NotifyStackNav}
                options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: TabarIcon,
                    tabBarBadge: 3,
                }}
            />
            <BottomTab.Screen
                name="ProfileTab"
                component={ProfileStackNav}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: TabarIcon,
                }}
            />
        </BottomTab.Navigator>
    );
}
