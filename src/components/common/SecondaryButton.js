import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export default function SecondaryButton({ title, onPress, loading = false, disabled = false, style }) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        disabled && styles.disabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.6}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    borderColor: COLORS.textMuted,
    opacity: 0.5,
  },
  text: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontWeight: '600',
  },
});
