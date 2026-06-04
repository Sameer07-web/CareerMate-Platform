import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export default function AppInput({ 
  control, 
  name, 
  label, 
  placeholder, 
  secureTextEntry, 
  keyboardType = 'default',
  multiline = false
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={[
              styles.input,
              multiline && styles.multilineInput,
              error && styles.inputError
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textMuted}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginBottom: SPACING.xxs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.sizes.md,
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.xs,
    marginTop: SPACING.xxs,
  },
});
