import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNotification } from '~/hooks/useNotification';
import theme from '~/core/theme';
import AccountStackNav from './AccountStackNav';
import HomeStackNav from './HomeStackNav';
import NotifyStackNav from './NotifyStackNav';

const BottomTab = createMaterialBottomTabNavigator();

export default function SettingsTabNav() {
    const { badge } = useNotification();

    return (
        <BottomTab.Navigator
            initialRouteName="HomeTab"
            activeColor="#fff"
            inactiveColor="#fff"
            activeIndicatorStyle={{ backgroundColor: theme.colors.outline }}
            barStyle={{ backgroundColor: theme.colors.primary }}
            tabBarHideOnKeyboard
            h
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
                    tabBarBadge: badge,
                }}
            />
            <BottomTab.Screen
                name="ProfileTab"
                component={AccountStackNav}
                options={{
                    tabBarStyle: { display: 'none' },
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color }) => <AntDesign name="user" color={color} size={24} />,
                }}
            />
        </BottomTab.Navigator>
    );
}
