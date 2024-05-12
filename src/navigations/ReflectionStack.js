import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateReflectionScreen, EditReflectionScreen, HistoryReflectionScreen } from '~/screens';

const ReflectionStack = createNativeStackNavigator();

export default function ReflectionStackNav() {
    return (
        <ReflectionStack.Navigator initialRouteName="Reflection" screenOptions={{ headerShown: false }}>
            <ReflectionStack.Screen
                name="Reflection"
                component={HistoryReflectionScreen}
                options={{
                    title: 'Dịch vụ',
                }}
            />

            <ReflectionStack.Screen
                name="CreateReflection"
                component={CreateReflectionScreen}
                options={{
                    title: 'Tạo phản ánh mới',
                }}
            />
            <ReflectionStack.Screen
                name="EditReflection"
                component={EditReflectionScreen}
                options={{
                    title: 'Chỉnh sửa phản ánh',
                }}
            />
        </ReflectionStack.Navigator>
    );
}
