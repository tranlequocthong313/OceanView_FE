import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileStackNav from './ProfileStackNav';
import HomeStackNav from './HomeStackNav';
import NotifyStackNav from './NotifyStackNav';

const BottomTab = createBottomTabNavigator();

function TabarIcon({ name }) {
    const icons = {
        home: <Ionicons name="home" color="black" size="24" />,
        bell: <MaterialCommunityIcons name="bell" color="black" size="24" />,
        user: <AntDesign name="user" color="black" size="24" />,
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
                    tabBarIcon: TabarIcon({ name: 'home' }),
                }}
            />
            <BottomTab.Screen
                name="NotificationTab"
                component={NotifyStackNav}
                options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: TabarIcon({ name: 'bell' }),
                    tabBarBadge: 3,
                }}
            />
            <BottomTab.Screen
                name="ProfileTab"
                component={ProfileStackNav}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: TabarIcon({ name: 'user' }),
                }}
            />
        </BottomTab.Navigator>
    );
}
