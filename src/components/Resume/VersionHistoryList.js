import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export default function VersionHistoryList({ versions, primaryVersionId, onSelect, onSetPrimary, onDelete, onReanalyze }) {
  
  if (!versions || versions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No versions uploaded yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {versions.map((version) => {
        const isPrimary = primaryVersionId === version._id;
        const isAnalyzing = version.analysisStatus === 'pending' || version.analysisStatus === 'processing';
        const hasFailed = version.analysisStatus === 'failed';

        return (
          <TouchableOpacity 
            key={version._id} 
            style={[styles.card, isPrimary && styles.cardPrimary]}
            onPress={() => onSelect(version)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.titleRow}>
                <Text style={styles.versionTitle}>Version {version.versionNumber}</Text>
                {isPrimary && (
                  <View style={styles.primaryBadge}>
                    <Text style={styles.primaryBadgeText}>PRIMARY</Text>
                  </View>
                )}
              </View>
              <Text style={styles.dateText}>{new Date(version.createdAt).toLocaleDateString()}</Text>
            </View>

            <View style={styles.statusRow}>
              {isAnalyzing ? (
                <View style={styles.statusBadge}>
                  <Ionicons name="sync" size={14} color={COLORS.info} style={{ marginRight: 4 }} />
                  <Text style={[styles.statusText, { color: COLORS.info }]}>Analyzing...</Text>
                </View>
              ) : hasFailed ? (
                <View style={styles.statusBadge}>
                  <Ionicons name="alert-circle" size={14} color={COLORS.error} style={{ marginRight: 4 }} />
                  <Text style={[styles.statusText, { color: COLORS.error }]}>Analysis Failed</Text>
                </View>
              ) : (
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle" size={14} color={COLORS.success} style={{ marginRight: 4 }} />
                  <Text style={[styles.statusText, { color: COLORS.success }]}>
                    ATS Score: {version.analysis?.atsScore || 'N/A'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.actionsRow}>
              {!isPrimary && (
                <TouchableOpacity style={styles.actionBtn} onPress={() => onSetPrimary(version._id)}>
                  <Text style={styles.actionText}>Set Primary</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.actionBtn} onPress={() => onReanalyze(version._id)}>
                <Text style={styles.actionText}>Reanalyze</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnDelete} onPress={() => onDelete(version._id)}>
                <Ionicons name="trash" size={16} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.md,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.md,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPrimary: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.textPrimary,
  },
  primaryBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: SPACING.sm,
  },
  primaryBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  statusRow: {
    marginBottom: SPACING.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: 'bold',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  actionBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  actionText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: '600',
  },
  actionBtnDelete: {
    padding: SPACING.xs,
    marginLeft: SPACING.md,
  }
});
