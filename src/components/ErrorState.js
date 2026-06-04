import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from './PrimaryButton';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';

const ErrorState = ({ message = 'Something Went Wrong', onRetry }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={COLORS.warning} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <PrimaryButton title="Try Again" onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  message: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  button: {
    minWidth: 150,
  }
});

export default ErrorState;
