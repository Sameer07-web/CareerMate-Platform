import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { atsService } from '../../services/atsService';
import ScoreCard from '../../components/ScoreCard';
import SectionHeader from '../../components/SectionHeader';
import LoadingState from '../../components/LoadingState';

const ATSAnalysisScreen = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    const data = await atsService.getATSAnalysis();
    setAnalysis(data);
    setLoading(false);
  };

  if (loading) {
    return <LoadingState message="Analyzing Resume..." />;
  }

  const renderSimpleList = (items, iconColor) => (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <View style={[styles.bullet, { backgroundColor: iconColor }]} />
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  const renderCategorizedList = (categoriesObj, iconColor) => (
    <View style={styles.listContainer}>
      {Object.entries(categoriesObj).map(([categoryName, items], index) => (
        <View key={index} style={styles.categoryBlock}>
          <Text style={styles.categoryTitle}>{categoryName}</Text>
          {items.map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: iconColor }]} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="ATS Analysis" />

      <ScoreCard
        title="Resume Match Percentage"
        score={analysis?.score}
        isProgress={true}
        subtitle="Based on software engineering roles."
      />

      <View style={styles.spacing} />

      <SectionHeader title="Score Breakdown" />
      <View style={styles.breakdownCard}>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Skills</Text>
          <View style={styles.breakdownBarContainer}>
            <View style={[styles.breakdownBarFill, { width: `${analysis?.scoreBreakdown.skills}%` }]} />
          </View>
          <Text style={styles.breakdownValue}>{analysis?.scoreBreakdown.skills}%</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Experience</Text>
          <View style={styles.breakdownBarContainer}>
            <View style={[styles.breakdownBarFill, { width: `${analysis?.scoreBreakdown.experience}%` }]} />
          </View>
          <Text style={styles.breakdownValue}>{analysis?.scoreBreakdown.experience}%</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Education</Text>
          <View style={styles.breakdownBarContainer}>
            <View style={[styles.breakdownBarFill, { width: `${analysis?.scoreBreakdown.education}%` }]} />
          </View>
          <Text style={styles.breakdownValue}>{analysis?.scoreBreakdown.education}%</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Projects</Text>
          <View style={styles.breakdownBarContainer}>
            <View style={[styles.breakdownBarFill, { width: `${analysis?.scoreBreakdown.projects}%` }]} />
          </View>
          <Text style={styles.breakdownValue}>{analysis?.scoreBreakdown.projects}%</Text>
        </View>
      </View>

      <SectionHeader title="Detailed Feedback" />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          <Text style={styles.cardTitle}>Strengths</Text>
        </View>
        {renderSimpleList(analysis?.strengths, COLORS.success)}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="warning" size={24} color={COLORS.warning} />
          <Text style={styles.cardTitle}>Missing Keywords</Text>
        </View>
        {renderCategorizedList(analysis?.missingKeywords, COLORS.warning)}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb" size={24} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Suggested Improvements</Text>
        </View>
        {renderSimpleList(analysis?.suggestions, COLORS.primary)}
      </View>

      <View style={{ height: SPACING.xxl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  spacing: {
    height: SPACING.sm,
  },
  breakdownCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  breakdownLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    width: 80,
  },
  breakdownBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: SPACING.sm,
    overflow: 'hidden',
  },
  breakdownBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
  },
  breakdownValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    width: 30,
    textAlign: 'right',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  listContainer: {
    paddingLeft: SPACING.xs,
  },
  categoryBlock: {
    marginBottom: SPACING.md,
  },
  categoryTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: SPACING.md,
  },
  listText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    flex: 1,
  },
});

export default ATSAnalysisScreen;
