import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import ATSAnalysisScreen from '../screens/ATS/ATSAnalysisScreen';
import MockInterviewScreen from '../screens/InterviewPrep/MockInterviewScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="ATSAnalysis" component={ATSAnalysisScreen} />
      <Stack.Screen name="MockInterview" component={MockInterviewScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
