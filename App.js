import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import navigations from '~/navigations';
import theme from './src/core/theme';
import { LoginScreen, UpdateInfoScreen, ResetPasswordScreen, Dashboard } from './src/screens';

const {HomeTabNav} = navigations

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
                    <AuthStack.Screen name="Dashboard" component={Dashboard} />
                    <AuthStack.Screen name="HomeScreen" component={HomeTabNav} />
                </AuthStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
