import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';

export default function EmptyState({ 
  icon = 'document-text-outline', 
  title = 'No Data Found', 
  description = 'There is nothing to display here right now.' 
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={COLORS.textMuted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
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
  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.md,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.md,
  },
});
