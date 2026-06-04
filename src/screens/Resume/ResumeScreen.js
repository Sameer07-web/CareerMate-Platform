import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { resumeService } from '../../services/resumeService';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';
import SectionHeader from '../../components/SectionHeader';

const ResumeScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    const data = await resumeService.getResumeHistory();
    setHistory(data);
    setLoading(false);
  };

  if (loading) {
    return <LoadingState message="Loading Resume Center..." />;
  }

  const handleUpload = () => {
    alert('Mock Upload: Resume uploaded successfully');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="Resume Center" />

      <TouchableOpacity style={styles.uploadCard} onPress={handleUpload}>
        <View style={styles.uploadIconContainer}>
          <Ionicons name="cloud-upload-outline" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.uploadTitle}>Upload New Resume</Text>
        <Text style={styles.uploadSubtitle}>PDF, DOCX up to 5MB</Text>
      </TouchableOpacity>

      <SectionHeader title="Version History" />
      
      {history.length === 0 ? (
        <EmptyState title="No Resumes" message="Upload your first resume to see history." />
      ) : (
        <View style={styles.historyTimeline}>
          {history.map((resume, index) => (
            <View key={resume.version} style={styles.historyItem}>
              <View style={styles.timelineNodeContainer}>
                <View style={[styles.timelineNode, resume.status === 'Active' && styles.timelineNodeActive]} />
                {index !== history.length - 1 && <View style={styles.timelineLine} />}
              </View>
              
              <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.versionText}>{resume.version}</Text>
                  <View style={[styles.badge, resume.status === 'Active' ? styles.badgeActive : styles.badgeArchived]}>
                    <Text style={[styles.badgeText, resume.status === 'Active' ? styles.badgeTextActive : styles.badgeTextArchived]}>
                      {resume.status}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.dateText}>Uploaded: {resume.date}</Text>
                
                <View style={styles.scoreRow}>
                  <Ionicons name="analytics" size={16} color={COLORS.primary} />
                  <Text style={styles.scoreText}>ATS Score: {resume.score}/100</Text>
                </View>

                {resume.status === 'Active' && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.iconBtn}>
                      <Ionicons name="eye-outline" size={20} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                      <Ionicons name="trash-outline" size={20} color={COLORS.warning} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {history.length > 1 && (
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>ATS Progression</Text>
          <View style={styles.trendRow}>
            {history.slice().reverse().map((r, i, arr) => (
              <React.Fragment key={r.version}>
                <View style={styles.trendItem}>
                  <Text style={styles.trendVersion}>{r.version}</Text>
                  <Text style={styles.trendScore}>{r.score}</Text>
                </View>
                {i !== arr.length - 1 && (
                  <Ionicons name="arrow-forward" size={16} color={COLORS.success} style={{ marginHorizontal: SPACING.sm }} />
                )}
              </React.Fragment>
            ))}
          </View>
          <Text style={styles.trendSubtitle}>Your resume is getting stronger!</Text>
        </View>
      )}

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
  uploadCard: {
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  uploadTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  uploadSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  historyTimeline: {
    marginTop: SPACING.md,
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  timelineNodeContainer: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timelineNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.border,
    zIndex: 1,
  },
  timelineNodeActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 4,
    borderColor: 'rgba(79, 70, 229, 0.3)',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginTop: -8,
    marginBottom: -24,
  },
  historyCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  versionText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  badgeActive: {
    borderColor: COLORS.success,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  badgeArchived: {
    borderColor: COLORS.border,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  badgeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: 'bold',
  },
  badgeTextActive: {
    color: COLORS.success,
  },
  badgeTextArchived: {
    color: COLORS.textSecondary,
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  scoreText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  iconBtn: {
    marginLeft: SPACING.md,
    padding: SPACING.xs,
  },
  trendCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  trendTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  trendItem: {
    alignItems: 'center',
  },
  trendVersion: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  trendScore: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  trendSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.success,
  },
});

export default ResumeScreen;
