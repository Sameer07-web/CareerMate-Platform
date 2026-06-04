import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export default function AnalysisReport({ analysis }) {
  if (!analysis) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-text-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.emptyText}>No analysis available for this version.</Text>
      </View>
    );
  }

  const { atsScore, keywordMatchPercentage, missingKeywords, strengths, weaknesses, suggestions } = analysis;

  const getScoreColor = (score) => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const renderList = (title, items, iconName, color) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name={iconName} size={16} color={color} style={styles.listIcon} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.scoreBox}>
          <Text style={[styles.scoreValue, { color: getScoreColor(atsScore) }]}>{atsScore || 0}</Text>
          <Text style={styles.scoreLabel}>ATS Score</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={[styles.scoreValue, { color: COLORS.primary }]}>{keywordMatchPercentage || 0}%</Text>
          <Text style={styles.scoreLabel}>Keyword Match</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {renderList('Strengths', strengths, 'checkmark-circle', COLORS.success)}
      {renderList('Weaknesses', weaknesses, 'close-circle', COLORS.error)}
      {renderList('Missing Keywords', missingKeywords, 'search', COLORS.warning)}
      {renderList('Suggestions for Improvement', suggestions, 'bulb', COLORS.info)}
      
      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
  },
  scoreBox: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 140,
  },
  scoreValue: {
    fontSize: 36,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  scoreLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  listIcon: {
    marginTop: 2,
    marginRight: SPACING.sm,
  },
  listText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  footerSpace: {
    height: SPACING.xxxl,
  }
});
