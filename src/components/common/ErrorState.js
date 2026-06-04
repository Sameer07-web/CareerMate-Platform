import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import PrimaryButton from './PrimaryButton';

export default function ErrorState({ 
  title = 'Something went wrong', 
  message = 'We encountered an error while loading this page.', 
  onRetry 
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={COLORS.error} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {onRetry && (
        <PrimaryButton 
          title="Try Again" 
          onPress={onRetry} 
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  message: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.md,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.md,
    marginBottom: SPACING.xl,
  },
  button: {
    width: '100%',
    maxWidth: 200,
  }
});
