import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // TODO: Add Redux authentication state here to conditionally render AuthNavigator vs AppNavigator
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="MainApp" component={AppNavigator} />
    </Stack.Navigator>
  );
}
