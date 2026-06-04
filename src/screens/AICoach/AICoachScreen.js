import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { aiCoachService } from '../../services/aiCoachService';
import LoadingState from '../../components/LoadingState';
import SectionHeader from '../../components/SectionHeader';
import PrimaryButton from '../../components/PrimaryButton';

const AICoachScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [showRoadmapSelector, setShowRoadmapSelector] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    loadChat();
  }, []);

  const loadChat = async () => {
    const history = await aiCoachService.getChatHistory();
    setMessages(history);
    setLoading(false);
  };

  const addMessage = (sender, text) => {
    const msg = { id: Date.now().toString(), sender, text };
    setMessages(prev => [...prev, msg]);
  };

  const handleSend = async (customText = null) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;
    
    addMessage('user', textToSend);
    if (!customText) setInputText('');
    
    // Simulate AI thinking
    setTimeout(() => {
      addMessage('ai', 'This is a personalized mock response regarding: ' + textToSend);
    }, 1200);
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
    addMessage('user', `Generate a Placement Roadmap for ${role}`);
    
    setTimeout(() => {
      const roadmapText = `Here is your customized Placement Roadmap for ${role}:

Week 1
Java OOP

Week 2
Collections Framework

Week 3
Spring Boot Fundamentals

Week 4
REST APIs

Week 5
React Fundamentals

Week 6
Build Portfolio Project

Would you like me to expand on any of these weeks?`;
      addMessage('ai', roadmapText);
    }, 1500);
  };

  if (loading) {
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
            key={msg.id} 
            style={[
              styles.messageBubble, 
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={[styles.messageText, msg.sender === 'user' && styles.userText]}>
              {msg.text}
            </Text>
          </View>
        ))}

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
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
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
    borderRadius: BORDER_RADIUS.full,
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
    borderRadius: BORDER_RADIUS.full,
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
