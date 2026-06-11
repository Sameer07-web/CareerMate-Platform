import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

const SectionHeader = ({ title, actionTitle, onActionPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionTitle && onActionPress && (
        <Text style={styles.action} onPress={onActionPress}>{actionTitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.textPrimary,
  },
  action: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  }
});

export default SectionHeader;
