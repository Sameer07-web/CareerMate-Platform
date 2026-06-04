import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ResumeScreen from '../screens/Resume/ResumeScreen';
import InterviewPrepScreen from '../screens/InterviewPrep/InterviewPrepScreen';
import AICoachScreen from '../screens/AICoach/AICoachScreen';
import ApplicationsScreen from '../screens/Applications/ApplicationsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Resume': iconName = focused ? 'document-text' : 'document-text-outline'; break;
            case 'Interview': iconName = focused ? 'videocam' : 'videocam-outline'; break;
            case 'Coach': iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'; break;
            case 'Apps': iconName = focused ? 'briefcase' : 'briefcase-outline'; break;
            case 'Profile': iconName = focused ? 'person' : 'person-outline'; break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Resume" component={ResumeScreen} />
      <Tab.Screen name="Interview" component={InterviewPrepScreen} />
      <Tab.Screen name="Coach" component={AICoachScreen} />
      <Tab.Screen name="Apps" component={ApplicationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
