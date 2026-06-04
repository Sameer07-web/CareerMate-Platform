import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';

const SplashScreen = ({ onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // For now, auto navigate to Login. 
      // In a real app, we would check for a token and navigate to Dashboard.
      onNavigate('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CareerMate</Text>
      <Text style={styles.subtitle}>AI-Powered Career Development Platform</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    letterSpacing: 1,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default SplashScreen;
