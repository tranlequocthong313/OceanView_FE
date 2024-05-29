import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListCardScreen, ServicesScreen } from '~/screens';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ParkingCardStack from './ParkingCardStackNav';
import AccessCardStack from './AccessCardStackNav';
import ResidentCardStack from './ResidentCardStackNav';

const ServiceStack = createNativeStackNavigator();

export default function ServiceStackNav({ navigation }) {
    return (
        <ServiceStack.Navigator initialRouteName="Services" screenOptions={{ headerShown: false }}>
            <ServiceStack.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    title: 'Dịch vụ',
                    headerShown: true,
                    headerRight: () => (
                        <FontAwesome5
                            name="history"
                            size={24}
                            color="black"
                            onPress={() => navigation.navigate('ListCard', { title: 'Danh sách thẻ đăng ký' })}
                            style={{ padding: 8 }}
                        />
                    ),
                }}
            />
            <ServiceStack.Screen
                name="ListCard"
                component={ListCardScreen}
                options={{
                    headerShown: true,
                    title: 'Danh sách thẻ đăng ký',
                }}
            />
            <ServiceStack.Screen
                name="ParkingCardMain"
                component={ParkingCardStack}
                options={{
                    title: 'Thẻ giữ xe',
                }}
            />

            <ServiceStack.Screen
                name="AccessCardMain"
                component={AccessCardStack}
                options={{
                    title: 'Thẻ ra vào',
                }}
            />
            <ServiceStack.Screen
                name="ResidentCardMain"
                component={ResidentCardStack}
                options={{
                    title: 'Thẻ cư dân',
                }}
            />
        </ServiceStack.Navigator>
    );
}
