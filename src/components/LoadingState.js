import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, BORDER_RADIUS } from '../theme/spacing';

const ShimmerBlock = ({ width, height, borderRadius = BORDER_RADIUS.sm, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: COLORS.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

const LoadingState = ({ variant = 'default' }) => {
  if (variant === 'dashboard') {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <ShimmerBlock width={100} height={14} style={{ marginBottom: 8 }} />
            <ShimmerBlock width={150} height={24} />
          </View>
          <ShimmerBlock width={60} height={30} borderRadius={15} />
        </View>
        <ShimmerBlock width="100%" height={120} borderRadius={BORDER_RADIUS.lg} style={{ marginBottom: SPACING.xl }} />
        <ShimmerBlock width={120} height={20} style={{ marginBottom: SPACING.md }} />
        <View style={styles.grid}>
          <ShimmerBlock width="48%" height={100} borderRadius={BORDER_RADIUS.lg} style={{ marginBottom: SPACING.md }} />
          <ShimmerBlock width="48%" height={100} borderRadius={BORDER_RADIUS.lg} style={{ marginBottom: SPACING.md }} />
          <ShimmerBlock width="48%" height={100} borderRadius={BORDER_RADIUS.lg} />
          <ShimmerBlock width="48%" height={100} borderRadius={BORDER_RADIUS.lg} />
        </View>
      </View>
    );
  }

  if (variant === 'profile') {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginBottom: SPACING.xl }}>
          <ShimmerBlock width={100} height={100} borderRadius={50} style={{ marginBottom: SPACING.md }} />
          <ShimmerBlock width={180} height={24} style={{ marginBottom: 8 }} />
          <ShimmerBlock width={140} height={16} />
        </View>
        <ShimmerBlock width="100%" height={80} borderRadius={BORDER_RADIUS.md} style={{ marginBottom: SPACING.xl }} />
        <ShimmerBlock width={100} height={20} style={{ marginBottom: SPACING.md }} />
        <ShimmerBlock width="100%" height={50} borderRadius={BORDER_RADIUS.md} style={{ marginBottom: SPACING.md }} />
        <ShimmerBlock width="100%" height={50} borderRadius={BORDER_RADIUS.md} style={{ marginBottom: SPACING.md }} />
        <ShimmerBlock width="100%" height={50} borderRadius={BORDER_RADIUS.md} />
      </View>
    );
  }

  // Default simple spinner with shimmer text
  return (
    <View style={[styles.container, styles.centered]}>
      <ShimmerBlock width={80} height={80} borderRadius={40} style={{ marginBottom: SPACING.lg }} />
      <ShimmerBlock width={150} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});

export default LoadingState;
