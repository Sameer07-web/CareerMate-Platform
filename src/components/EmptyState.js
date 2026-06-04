import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';
import PrimaryButton from './PrimaryButton';

const EmptyState = ({ 
  icon = 'document-text-outline', 
  title = 'No Data Found', 
  message = 'There is nothing to show here.',
  actionTitle,
  onAction
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={COLORS.border} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionTitle && onAction && (
        <PrimaryButton 
          title={actionTitle} 
          onPress={onAction} 
          style={styles.button}
        />
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
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  button: {
    minWidth: 200,
  }
});

export default EmptyState;
