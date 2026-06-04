import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash">
        {props => <SplashScreen {...props} onNavigate={(screen) => props.navigation.replace(screen === 'Dashboard' ? 'Login' : screen)} />}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onNavigateToSignup={() => props.navigation.navigate('Signup')} onLoginSuccess={() => props.navigation.replace('MainApp')} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {props => <SignupScreen {...props} onNavigateToLogin={() => props.navigation.navigate('Login')} onSignupSuccess={() => props.navigation.replace('MainApp')} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
