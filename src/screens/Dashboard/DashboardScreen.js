import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import ScoreCard from '../../components/ScoreCard';
import FeatureCard from '../../components/FeatureCard';
import SectionHeader from '../../components/SectionHeader';
import LoadingState from '../../components/LoadingState';
import { userStore } from '../../store/userStore';

const TrendIndicator = ({ type }) => {
  let iconName = 'remove-outline';
  let color = COLORS.textSecondary;
  if (type === 'up') {
    iconName = 'arrow-up-outline';
    color = COLORS.success;
  } else if (type === 'down') {
    iconName = 'arrow-down-outline';
    color = COLORS.warning;
  }
  return <Ionicons name={iconName} size={16} color={color} style={styles.trendIcon} />;
};

const DashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUser(userStore.getUser());
      setAnalytics(userStore.getAnalytics());
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingState variant="dashboard" />;
  }

  // Find max for chart scaling
  const maxProgress = Math.max(...(analytics?.weeklyProgress || [100]));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back,</Text>
          <Text style={styles.name}>{user?.firstName}</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lvl {user?.level}</Text>
        </View>
      </View>

      <View style={styles.xpContainer}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpText}>{user?.xp} XP</Text>
          <Text style={styles.xpNeeded}>{user?.xpNeeded} XP to next level</Text>
        </View>
        <View style={styles.xpBarBackground}>
          <View style={[styles.xpBarFill, { width: `${(user?.xp / (user?.xp + user?.xpNeeded)) * 100}%` }]} />
        </View>
      </View>

      <ScoreCard 
        title="Placement Readiness" 
        score={analytics?.placementReadiness} 
        isProgress={true} 
      />

      <SectionHeader title="Weekly Progress" />
      <View style={styles.chartCard}>
        <View style={styles.chartContainer}>
          {analytics?.weeklyProgress.map((val, index) => (
            <View key={index} style={styles.chartBarWrapper}>
              <View style={styles.chartBarBackground}>
                <View style={[styles.chartBarFill, { height: `${(val / maxProgress) * 100}%` }]} />
              </View>
              <Text style={styles.chartLabel}>Wk {index + 1}</Text>
            </View>
          ))}
        </View>
      </View>

      <SectionHeader title="Performance Trends" />
      <View style={styles.grid}>
        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>ATS Score</Text>
            <TrendIndicator type={analytics?.trends.ats} />
          </View>
          <Text style={styles.trendScore}>{analytics?.atsScore}</Text>
        </View>
        
        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>Resume</Text>
            <TrendIndicator type={analytics?.trends.resume} />
          </View>
          <Text style={styles.trendScore}>{analytics?.resumeScore}</Text>
        </View>

        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>Interview</Text>
            <TrendIndicator type={analytics?.trends.interview} />
          </View>
          <Text style={styles.trendScore}>{analytics?.interviewScore}</Text>
        </View>
        
        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>DSA</Text>
            <TrendIndicator type="up" />
          </View>
          <Text style={styles.trendScore}>{analytics?.dsaProgress}</Text>
        </View>
      </View>

      <SectionHeader title="Achievements" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
        {analytics?.achievements.map((achievement) => (
          <View key={achievement.id} style={[styles.achievementCard, !achievement.earned && styles.achievementLocked]}>
            <View style={[styles.achievementIconWrapper, !achievement.earned && styles.achievementIconLocked]}>
              <Ionicons name={achievement.icon} size={24} color={achievement.earned ? COLORS.primary : COLORS.textSecondary} />
            </View>
            <Text style={[styles.achievementTitle, { textAlign: 'center' }]} numberOfLines={2}>{achievement.title}</Text>
          </View>
        ))}
      </ScrollView>

      <SectionHeader title="Quick Actions" />
      <View style={styles.row}>
        <FeatureCard 
          title="Resume Center" 
          icon="document-text" 
          onPress={() => navigation.navigate('Resume')} 
          isSmall 
        />
        <View style={{ width: SPACING.md }} />
        <FeatureCard 
          title="ATS Analysis" 
          icon="analytics" 
          onPress={() => navigation.navigate('ATSAnalysis')} 
          isSmall 
        />
      </View>
      <View style={[styles.row, { marginTop: SPACING.md }]}>
        <FeatureCard 
          title="Interview Prep" 
          icon="videocam" 
          onPress={() => navigation.navigate('Interview')} 
          isSmall 
        />
        <View style={{ width: SPACING.md }} />
        <FeatureCard 
          title="AI Coach" 
          icon="chatbubbles" 
          onPress={() => navigation.navigate('Coach')} 
          isSmall 
        />
      </View>

      <SectionHeader title="Next Best Action" />
      <View style={styles.actionCard}>
        {analytics?.nextBestActions.map((action, index) => (
          <View key={index} style={styles.actionItem}>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <View style={styles.xpTag}>
              <Text style={styles.xpTagText}>+{action.xpGained} XP</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: SPACING.xxl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  greeting: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  levelBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', // Warning/Amber tinted
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  levelText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  xpContainer: {
    marginBottom: SPACING.lg,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  xpText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  xpNeeded: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  xpBarBackground: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: SPACING.md,
  },
  chartBarWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarBackground: {
    width: 24,
    height: '100%',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
  },
  chartLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trendCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  trendTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  trendIcon: {
    marginLeft: 4,
  },
  trendScore: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  achievementsScroll: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  achievementCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: SPACING.md,
    width: 100,
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  achievementLocked: {
    borderColor: COLORS.border,
    opacity: 0.6,
  },
  achievementIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  achievementIconLocked: {
    backgroundColor: COLORS.background,
  },
  achievementTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  actionCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  xpTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  xpTagText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    fontWeight: 'bold',
  }
});

export default DashboardScreen;
