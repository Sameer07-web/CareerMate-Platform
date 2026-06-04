import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export default function PrimaryButton({ title, onPress, loading = false, disabled = false, style }) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        disabled && styles.disabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.7,
  },
  text: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.md,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontWeight: '600',
  },
});
