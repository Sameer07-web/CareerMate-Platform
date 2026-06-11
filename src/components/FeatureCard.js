import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../theme';

const FeatureCard = ({ title, subtitle, icon, onPress, isSmall = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isSmall && styles.smallContainer]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={isSmall ? 24 : 32} color={COLORS.primary} />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      {subtitle && <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  smallContainer: {
    padding: SPACING.md,
  },
  iconContainer: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: BORDER_RADIUS.md,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  }
});

export default FeatureCard;
