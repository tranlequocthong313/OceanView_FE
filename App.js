import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsTabNav from '~/navigations/BottomTabNav';
import theme from './src/core/theme';
import { LoginScreen, UpdateInfoScreen, ResetPasswordScreen } from './src/screens';

const AuthStack = createStackNavigator();

export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <AuthStack.Navigator
                    initialRouteName="HomeScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
                    <AuthStack.Screen name="UpdateInfoScreen" component={UpdateInfoScreen} />
                    <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                    <AuthStack.Screen name="HomeScreen" component={SettingsTabNav} />
                </AuthStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
