import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { startNewSession, fetchMessages, sendMessage, optimisticAddMessage } from '../../store/aiSlice';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme';
import { TYPOGRAPHY } from '../../theme/typography';
import LoadingState from '../../components/LoadingState';
import SectionHeader from '../../components/SectionHeader';
import PrimaryButton from '../../components/PrimaryButton';

const AICoachScreen = () => {
  const dispatch = useDispatch();
  const { currentSessionId, messages, messagesStatus, sessionsStatus, isSending, error } = useSelector((state) => state.ai);

  const [inputText, setInputText] = useState('');
  const [showRoadmapSelector, setShowRoadmapSelector] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // If we don't have a session and aren't already creating one, start one
    if (!currentSessionId && sessionsStatus !== 'loading') {
      dispatch(startNewSession({ sessionType: 'career', firstMessage: 'Hello, I am ready to start my career coaching.' }));
    } else if (currentSessionId) {
      // If we have a session but no messages loaded yet, fetch them
      if (messagesStatus === 'idle') {
        dispatch(fetchMessages(currentSessionId));
      }
    }
  }, [dispatch, currentSessionId, messagesStatus, sessionsStatus]);

  const handleSend = async (customText = null) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || !currentSessionId) return;

    // Optimistically add user message to UI
    dispatch(optimisticAddMessage({
      _id: Date.now().toString(),
      sender: 'user',
      content: textToSend
    }));

    if (!customText) setInputText('');

    // Dispatch real API call
    dispatch(sendMessage({ sessionId: currentSessionId, content: textToSend }));
  };

  const handleSuggestion = (text) => {
    if (text === 'Placement Roadmap Generator') {
      setShowRoadmapSelector(true);
      return;
    }
    handleSend(text);
  };

  const generateRoadmap = (role) => {
    setShowRoadmapSelector(false);
    handleSend(`Generate a Placement Roadmap for ${role}`);
  };

  // The screen is loading if we are fetching the initial session or messages
  if (messagesStatus === 'loading' && messages.length === 0) {
    return <LoadingState message="Connecting to AI Coach..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <SectionHeader title="AI Career Coach" />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg._id || msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={[styles.messageText, msg.sender === 'user' && styles.userText]}>
              {msg.content}
            </Text>
          </View>
        ))}

        {isSending && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
             <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
             <Text style={styles.errorText}>Failed to send message: {error}</Text>
          </View>
        )}

        {showRoadmapSelector && (
          <View style={styles.roadmapSelector}>
            <Text style={styles.roadmapTitle}>Select Target Role:</Text>
            <View style={styles.roadmapOptions}>
              <PrimaryButton title="Full Stack Developer" onPress={() => generateRoadmap('Full Stack Developer')} style={styles.roadmapBtn} />
              <PrimaryButton title="Backend Developer" onPress={() => generateRoadmap('Backend Developer')} style={styles.roadmapBtn} />
              <PrimaryButton title="Java Developer" onPress={() => generateRoadmap('Java Developer')} style={styles.roadmapBtn} />
            </View>
            <TouchableOpacity onPress={() => setShowRoadmapSelector(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.suggestionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('How can I improve my ATS score?')}>
            <Text style={styles.suggestionText}>How can I improve my ATS score?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('What should I learn for Full Stack roles?')}>
            <Text style={styles.suggestionText}>What should I learn for Full Stack roles?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('How can I prepare for Java interviews?')}>
            <Text style={styles.suggestionText}>How can I prepare for Java interviews?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('Review Resume')}>
            <Text style={styles.suggestionText}>Review Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('Skill Gap Analysis')}>
            <Text style={styles.suggestionText}>Skill Gap Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('Placement Strategy')}>
            <Text style={styles.suggestionText}>Placement Strategy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('Placement Roadmap Generator')}>
            <Text style={styles.suggestionText}>Placement Roadmap Generator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionPill} onPress={() => handleSuggestion('Interview Questions')}>
            <Text style={styles.suggestionText}>Interview Questions</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          placeholderTextColor={COLORS.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          editable={!isSending}
        />
        <TouchableOpacity 
          style={[styles.sendButton, isSending && { opacity: 0.5 }]} 
          onPress={() => handleSend()}
          disabled={isSending}
        >
          <Ionicons name="send" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  chatContent: {
    paddingBottom: SPACING.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  userText: {
    color: '#FFF',
  },
  errorContainer: {
    alignSelf: 'center',
    marginVertical: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: BORDER_RADIUS.sm,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
  },
  suggestionsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  suggestionPill: {
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  suggestionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.md,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    maxHeight: 100,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.body,
  },
  sendButton: {
    marginLeft: SPACING.md,
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roadmapSelector: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: SPACING.sm,
  },
  roadmapTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  roadmapOptions: {
    marginBottom: SPACING.md,
  },
  roadmapBtn: {
    marginBottom: SPACING.sm,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  cancelText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  }
});

export default AICoachScreen;
