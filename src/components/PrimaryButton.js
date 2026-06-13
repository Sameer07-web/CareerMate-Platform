import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, BORDER_RADIUS } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';

const PrimaryButton = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (disabled || isLoading) && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.textPrimary} size="small" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    ...TYPOGRAPHY.button,
    color: COLORS.textPrimary,
  }
});

export default PrimaryButton;
