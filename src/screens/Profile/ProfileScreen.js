import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme';
import { TYPOGRAPHY } from '../../theme/typography';
import { userStore } from '../../store/userStore';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingState from '../../components/LoadingState';
import ScoreCard from '../../components/ScoreCard';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    setTimeout(() => {
      setUser(userStore.getUser());
      setLoading(false);
    }, 500);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <LoadingState variant="profile" />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person" size={48} color={COLORS.textSecondary} />
            {isEditing && (
              <TouchableOpacity style={styles.editImageBtn}>
                <Ionicons name="camera" size={16} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.targetRole}>{user?.targetRole}</Text>
          <Text style={styles.email}>{user?.college} • {user?.graduationYear}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user?.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user?.xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>
      </View>

      <ScoreCard
        title="Placement Readiness"
        score={78}
        isProgress={true}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Goal</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            value={user?.careerGoal}
            placeholderTextColor={COLORS.textSecondary}
            multiline
          />
        ) : (
          <Text style={styles.careerGoalText}>{user?.careerGoal}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>College</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={user?.college} />
          ) : (
            <Text style={styles.value}>{user?.college}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Branch</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={user?.branch} />
          ) : (
            <Text style={styles.value}>{user?.branch}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Expected Graduation Year</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={user?.graduationYear} />
          ) : (
            <Text style={styles.value}>{user?.graduationYear}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Skills</Text>
        <View style={styles.skillsContainer}>
          {user?.skills.map((skill, index) => (
            <View key={index} style={styles.skillPill}>
              <Text style={styles.skillText}>{skill}</Text>
              {isEditing && (
                <TouchableOpacity style={{ marginLeft: 4 }}>
                  <Ionicons name="close-circle" size={16} color={COLORS.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          {isEditing && (
            <TouchableOpacity style={[styles.skillPill, { borderStyle: 'dashed' }]}>
              <Text style={styles.skillText}>+ Add Skill</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <PrimaryButton title="Save Profile" onPress={handleSave} />
        ) : (
          <PrimaryButton title="Edit Profile" onPress={() => setIsEditing(true)} style={{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.primary }} />
        )}
      </View>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: SPACING.xs,
  },
  settingsButton: {
    padding: SPACING.xs,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  editImageBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  targetRole: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.border,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  careerGoalText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  fieldContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  input: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.card,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  skillText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
  },
});

export default ProfileScreen;
