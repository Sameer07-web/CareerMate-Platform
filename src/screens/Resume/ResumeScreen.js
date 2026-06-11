import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchResumes, 
  fetchVersions, 
  uploadResume, 
  setPrimaryResumeVersion, 
  deleteResumeVersion, 
  reanalyzeResume,
  setSelectedVersion
} from '../../store/resumeSlice';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import SectionHeader from '../../components/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import PrimaryButton from '../../components/common/PrimaryButton';
import VersionHistoryList from '../../components/Resume/VersionHistoryList';
import AnalysisReport from '../../components/Resume/AnalysisReport';

export default function ResumeScreen() {
  const dispatch = useDispatch();
  const { currentResume, versions, loading, error, selectedVersion } = useSelector(state => state.resume);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'analysis'

  useEffect(() => {
    dispatch(fetchResumes()).then((action) => {
      if (action.payload && action.payload._id) {
        dispatch(fetchVersions(action.payload._id));
      }
    });
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchResumes()).then((action) => {
      if (action.payload && action.payload._id) {
        dispatch(fetchVersions(action.payload._id));
      }
    });
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      // Validation
      if (file.mimeType !== 'application/pdf') {
        return Alert.alert('Invalid File', 'Only PDF files are supported.');
      }
      if (file.size > 5 * 1024 * 1024) {
        return Alert.alert('File Too Large', 'File exceeds 5 MB upload limit.');
      }

      const formData = new FormData();
      formData.append('resume', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      });

      dispatch(uploadResume(formData));
    } catch (err) {
      console.error('Document picker error:', err);
      Alert.alert('Upload Error', 'Something went wrong while picking the document.');
    }
  };

  const handleDelete = (versionId) => {
    Alert.alert('Delete Version', 'Are you sure you want to delete this version?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: () => {
          if (currentResume) {
            dispatch(deleteResumeVersion({ versionId, resumeId: currentResume._id }));
          }
        }
      }
    ]);
  };

  const handleSetPrimary = (versionId) => {
    dispatch(setPrimaryResumeVersion(versionId));
  };

  const handleReanalyze = (versionId) => {
    if (currentResume) {
      dispatch(reanalyzeResume({ versionId, resumeId: currentResume._id }));
      Alert.alert('Reanalysis Started', 'Your resume is being reanalyzed in the background.');
    }
  };

  const handleSelectVersion = (version) => {
    dispatch(setSelectedVersion(version));
    setViewMode('analysis');
  };

  if (loading && !currentResume && versions.length === 0) {
    return <LoadingSpinner />;
  }

  const primaryVersionId = currentResume?.primaryVersionId;
  const primaryVersion = versions.find(v => v._id === primaryVersionId) || versions[0];
  
  const displayVersion = selectedVersion || primaryVersion;

  return (
    <View style={styles.container}>
      <SectionHeader title="Resume Dashboard" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} tintColor={COLORS.primary} />
        }
      >
        {/* TOP METRICS CARD */}
        {primaryVersion && (
          <View style={styles.metricsCard}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{primaryVersion.analysis?.atsScore || '...'}</Text>
              <Text style={styles.metricLabel}>Primary ATS Score</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{versions.length}</Text>
              <Text style={styles.metricLabel}>Total Versions</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValueSmall}>
                {primaryVersion.analysis?.analyzedAt 
                  ? new Date(primaryVersion.analysis.analyzedAt).toLocaleDateString() 
                  : 'N/A'}
              </Text>
              <Text style={styles.metricLabel}>Last Analyzed</Text>
            </View>
          </View>
        )}

        {/* UPLOAD CTA */}
        <TouchableOpacity style={styles.uploadCard} onPress={handleUpload} disabled={loading}>
          <View style={styles.uploadIconContainer}>
            <Ionicons name="cloud-upload-outline" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.uploadTitle}>{loading ? 'Uploading...' : 'Upload New Resume'}</Text>
          <Text style={styles.uploadSubtitle}>PDF only, up to 5MB</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {versions.length === 0 ? (
          <EmptyState title="No Resumes" message="Upload your first resume to get started." />
        ) : (
          <View style={styles.tabsContainer}>
            <View style={styles.tabHeader}>
              <TouchableOpacity 
                style={[styles.tabBtn, viewMode === 'overview' && styles.tabBtnActive]}
                onPress={() => setViewMode('overview')}
              >
                <Text style={[styles.tabText, viewMode === 'overview' && styles.tabTextActive]}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabBtn, viewMode === 'analysis' && styles.tabBtnActive]}
                onPress={() => setViewMode('analysis')}
              >
                <Text style={[styles.tabText, viewMode === 'analysis' && styles.tabTextActive]}>ATS Report</Text>
              </TouchableOpacity>
            </View>

            {viewMode === 'overview' ? (
              <VersionHistoryList 
                versions={versions}
                primaryVersionId={primaryVersionId}
                onSelect={handleSelectVersion}
                onSetPrimary={handleSetPrimary}
                onDelete={handleDelete}
                onReanalyze={handleReanalyze}
              />
            ) : (
              <View style={styles.analysisSection}>
                {displayVersion && (
                  <Text style={styles.analysisTitle}>
                    Report for Version {displayVersion.versionNumber}
                  </Text>
                )}
                <AnalysisReport analysis={displayVersion?.analysis} />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  metricsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: '70%',
    backgroundColor: COLORS.border,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
  },
  metricValueSmall: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.textPrimary,
    marginTop: 6,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
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
    fontSize: TYPOGRAPHY.sizes.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  uploadSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  tabsContainer: {
    flex: 1,
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  tabBtn: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  analysisSection: {
    flex: 1,
    marginTop: SPACING.sm,
  },
  analysisTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  }
});
