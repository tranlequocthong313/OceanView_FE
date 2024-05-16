import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    DetailsInvoiceScreen,
    DetailsProfileScreen,
    HomeScreen,
    InvoiceScreen,
    LockerDetailScreen,
    SeeMoreScreen,
    UtilityScreen,
    WebViewScreen,
} from '~/screens';
import { useUser } from '~/hooks/useUser';
import ServiceStackNav from './ServicesNav/ServicesStack';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNav() {
    const user = useUser();

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
                name="SeeMore"
                component={SeeMoreScreen}
                options={{
                    title: 'Tính năng nổi bật',
                }}
            />
            <HomeStack.Screen
                name="LockerDetailScreen"
                component={LockerDetailScreen}
                initialParams={{ lockerId: user?.locker, forAdmin: false }}
                options={({ route }) => {
                    const locker = route.params?.locker;
                    return {
                        title: locker
                            ? `${locker?.owner?.resident_id} - ${locker?.owner?.personal_information?.full_name}`
                            : `${user?.resident_id} - ${user?.personal_information?.full_name}`,
                    };
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
                name="DetailsProfile"
                component={DetailsProfileScreen}
                options={{
                    title: 'Thông tin cá nhân',
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
