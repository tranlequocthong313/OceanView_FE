import { useEffect } from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsTabNav from '~/navigations/BottomTabNav';
import MethodResetPasswordScreen from '~/screens/Login/MethodResetPasswordScreen';
import ForgotPasswordScreen from '~/screens/Login/ForgotPasswordScreen';
import OTPScreen from '~/screens/Login/OTPScreen';
import UserProvider from '~/providers/UserProvider';
import messaging from '@react-native-firebase/messaging';
import theme from './src/core/theme';
import { LoginScreen, UpdateInfoScreen, ResetPasswordScreen } from './src/screens';

const AuthStack = createStackNavigator();

export default function App() {
    useEffect(() => messaging().onMessage(async (remoteMessage) => {
          console.log('Message handled in the foreground!', JSON.parse(remoteMessage));
    }), []);

    return (
        <UserProvider>
            <Provider theme={theme}>
                <NavigationContainer>
                    <AuthStack.Navigator
                        initialRouteName="LoginScreen"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
                        <AuthStack.Screen name="UpdateInfoScreen" component={UpdateInfoScreen} />
                        <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                        <AuthStack.Screen name="MethodResetPasswordScreen" component={MethodResetPasswordScreen} />
                        <AuthStack.Screen name="OTPScreen" component={OTPScreen} />
                        <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                        <AuthStack.Screen name="HomeScreen" component={SettingsTabNav} />
                    </AuthStack.Navigator>
                </NavigationContainer>
            </Provider>
        </UserProvider>
    );
}
