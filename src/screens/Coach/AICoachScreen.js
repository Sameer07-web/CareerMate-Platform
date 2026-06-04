import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSessions, 
  startNewSession, 
  fetchMessages, 
  sendMessage,
  optimisticAddMessage
} from '../../store/aiSlice';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import ChatMessage from '../../components/Chat/ChatMessage';
import SuggestedPrompts from '../../components/Chat/SuggestedPrompts';

export default function AICoachScreen() {
  const dispatch = useDispatch();
  const flatListRef = useRef();
  
  const { currentSessionId, messages, sessionsStatus, messagesStatus, isSending } = useSelector(state => state.ai);
  const [inputText, setInputText] = useState('');

  // Initial load
  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  // Load messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      dispatch(fetchMessages(currentSessionId));
    }
  }, [currentSessionId, dispatch]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const content = inputText.trim();
    setInputText('');

    let activeSessionId = currentSessionId;

    // If no active session, start one based on this message
    if (!activeSessionId) {
      try {
        const newSession = await dispatch(startNewSession({ sessionType: 'career', firstMessage: content })).unwrap();
        activeSessionId = newSession._id;
      } catch (err) {
        console.error('Failed to start session', err);
        return;
      }
    }

    // Optimistically add the user message
    const tempUserMsg = {
      _id: Date.now().toString(),
      sender: 'user',
      content
    };
    dispatch(optimisticAddMessage(tempUserMsg));

    // Send to backend
    dispatch(sendMessage({ sessionId: activeSessionId, content }));
  };

  const handleSelectSuggestedPrompt = (promptText) => {
    setInputText(promptText);
  };

  const renderItem = ({ item }) => (
    <ChatMessage message={item} />
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="sparkles" size={24} color={COLORS.primary} />
          <Text style={styles.headerTitle}>CareerMate AI Coach</Text>
        </View>
        <Text style={styles.headerSubtitle}>Powered by Gemini</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyText}>Start a new conversation to get personalized career guidance, resume reviews, or mock interview questions.</Text>
            <SuggestedPrompts onSelectPrompt={handleSelectSuggestedPrompt} />
          </View>
        )}
        ListFooterComponent={() => (
          isSending ? (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.typingText}>AI is thinking...</Text>
            </View>
          ) : null
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything about your career..."
          placeholderTextColor={COLORS.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
          onPress={handleSend}
          disabled={!inputText.trim() || isSending}
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  chatContainer: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.md,
    lineHeight: 24,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  typingText: {
    marginLeft: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: TYPOGRAPHY.sizes.md,
    maxHeight: 120,
    minHeight: 40,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
    marginBottom: 2, // align with input bottom
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  }
});
