import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { COLORS } from './src/theme/colors';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  console.log('[APP] rendering');
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
