import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { interviewService } from '../../services/interviewService';
import SectionHeader from '../../components/SectionHeader';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingState from '../../components/LoadingState';
import ScoreCard from '../../components/ScoreCard';
import { Ionicons } from '@expo/vector-icons';

const InterviewPrepScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedData = await interviewService.getInterviewData();
    setData(fetchedData);
    setLoading(false);
  };

  if (loading) {
    return <LoadingState message="Loading Interview Prep..." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="Interview Dashboard" />
      
      <ScoreCard 
        title="Average Interview Score" 
        score={data?.averageScore} 
        isProgress={true}
      />

      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>Ready for a mock session?</Text>
        <Text style={styles.actionSubtitle}>Practice with our AI interviewer to boost your score.</Text>
        <View style={styles.actionButtonsRow}>
          <PrimaryButton 
            title="Start Mock Interview" 
            onPress={() => navigation.navigate('MockInterview')} 
            style={{ flex: 1 }} 
          />
        </View>
      </View>

      <SectionHeader title="Recent Attempts" />
      {data?.history && data.history.length > 0 ? (
        <View style={styles.historyContainer}>
          {data.history.map((attempt) => (
            <View key={attempt.id} style={styles.historyItem}>
              <View style={styles.historyInfo}>
                <Ionicons name="videocam" size={24} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                <View>
                  <Text style={styles.historyTitle}>{attempt.title}</Text>
                  <Text style={styles.historyDate}>{attempt.date}</Text>
                </View>
              </View>
              <Text style={styles.historyScore}>{attempt.score}/100</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noHistoryText}>No mock interviews completed yet.</Text>
      )}

      <SectionHeader title="Technical Topics" />
      {data?.questions.technical.map((item, index) => (
        <View key={index} style={styles.questionCard}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicText}>{item.topic}</Text>
          </View>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>
      ))}

      <SectionHeader title="Behavioral Questions" />
      {data?.questions.behavioral.map((question, index) => (
        <View key={index} style={styles.questionCard}>
          <Text style={styles.questionText}>{question}</Text>
        </View>
      ))}
      
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
  actionCard: {
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  actionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  actionSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  actionButtonsRow: {
    flexDirection: 'row',
  },
  historyContainer: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  historyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  historyDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  historyScore: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  noHistoryText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  questionCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topicBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.md,
  },
  topicText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  questionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
});

export default InterviewPrepScreen;
