import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsInvoiceScreen, HomeScreen, InvoiceScreen, UtilityScreen, WebViewScreen } from '~/screens';
import ServiceStackNav from './ServicesNav/ServicesStack';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNav() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="UtilityScreen"
                component={UtilityScreen}
                options={{
                    title: 'Tiện ích',
                }}
            />
            <HomeStack.Screen
                name="ServiceScreen"
                component={ServiceStackNav}
                options={{
                    title: 'Dịch vụ',
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="InvoiceScreen"
                component={InvoiceScreen}
                options={{
                    title: 'Hoá đơn',
                }}
            />
            <HomeStack.Screen
                name="DetailsInvoice"
                component={DetailsInvoiceScreen}
                options={{
                    title: 'Chi tiết hoá đơn',
                }}
            />
            <HomeStack.Screen
                name="WebViewScreen"
                component={WebViewScreen}
                options={{
                    title: 'Màn hình thanh toán',
                    headerShown: false,
                }}
            />
        </HomeStack.Navigator>
    );
}
