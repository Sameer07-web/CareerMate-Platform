import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, appStatus } = useSelector((state) => state.auth);
  console.log('[ROOT] rendered, appStatus =', appStatus, 'isAuthenticated =', isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {(appStatus === 'loading' || appStatus === 'idle') ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : !isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="MainApp" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
}
