import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../theme';

export default function LoadingSpinner({ size = 'large', color = COLORS.primary, style }) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
