import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, BORDER_RADIUS } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';

const ScoreCard = ({ title, score, subtitle, isProgress = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.maxScore}>/ 100</Text>
      </View>
      
      {isProgress && (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${score}%` }]} />
        </View>
      )}

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
  },
  maxScore: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  }
});

export default ScoreCard;
