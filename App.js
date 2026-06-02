import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import { COLORS } from './src/theme/colors';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {currentScreen === 'Login' ? (
        <LoginScreen 
          onNavigateToSignup={() => setCurrentScreen('Signup')} 
          onLoginSuccess={() => alert('Proceed to Main App!')}
        />
      ) : (
        <SignupScreen 
          onNavigateToLogin={() => setCurrentScreen('Login')} 
          onSignupSuccess={() => alert('Account created! Proceed to Main App!')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
