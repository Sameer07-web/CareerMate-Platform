import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

const PROMPTS = [
  { id: '1', title: 'Resume Review', icon: 'document-text', text: 'Can you review my resume and give me an ATS score?' },
  { id: '2', title: 'Interview Prep', icon: 'mic', text: 'Ask me a technical interview question for a React Native role.' },
  { id: '3', title: 'Learning Roadmap', icon: 'map', text: 'Create a 3-month roadmap to become a Full Stack Developer.' },
  { id: '4', title: 'Skill Gap Analysis', icon: 'analytics', text: 'Analyze my skills and tell me what I am missing for Backend roles.' },
  { id: '5', title: 'Placement Guidance', icon: 'briefcase', text: 'How do I negotiate my first software engineering salary?' },
];

export default function SuggestedPrompts({ onSelectPrompt }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Suggested Prompts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {PROMPTS.map((prompt) => (
          <TouchableOpacity 
            key={prompt.id} 
            style={styles.promptCard}
            onPress={() => onSelectPrompt(prompt.text)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={prompt.icon} size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.promptTitle}>{prompt.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.lg,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
  },
  promptCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.sm,
  },
  promptTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.textPrimary,
    textAlign: 'center',
  }
});
