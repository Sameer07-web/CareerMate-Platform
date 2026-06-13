import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme';
import { TYPOGRAPHY } from '../../theme/typography';
import { interviewService } from '../../services/interviewService';
import SectionHeader from '../../components/SectionHeader';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingState from '../../components/LoadingState';
import ScoreCard from '../../components/ScoreCard';

const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarBg}>
    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
  </View>
);

const MockInterviewScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(150); // 2:30 in seconds
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let timer;
    if (step === 3 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const loadQuestions = async () => {
    setLoading(true);
    const data = await interviewService.getInterviewData();
    setQuestions(data.questions.technical); // Just mock data
    setLoading(false);
    setStep(3);
    setTimeLeft(150);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await interviewService.submitMockSession(role, difficulty, answer);
    setFeedback(result);
    setStep(4);
    setLoading(false);
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) {
    return <LoadingState message={step === 4 ? "AI is evaluating your session..." : "Preparing Interview..."} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="Mock Interview" />

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Target Role</Text>
          <Text style={styles.cardSubtitle}>Choose the role you are preparing for.</Text>

          {['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Java Developer'].map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.optionBtn, role === r && styles.optionBtnActive]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.optionText, role === r && styles.optionTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}

          <PrimaryButton title="Next" onPress={() => setStep(2)} disabled={!role} style={{ marginTop: SPACING.md }} />
        </View>
      )}

      {/* Step 2: Difficulty Selection */}
      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Difficulty</Text>
          <Text style={styles.cardSubtitle}>Choose the complexity of the questions.</Text>

          {['Beginner', 'Intermediate', 'Advanced'].map(d => (
            <TouchableOpacity
              key={d}
              style={[styles.optionBtn, difficulty === d && styles.optionBtnActive]}
              onPress={() => setDifficulty(d)}
            >
              <Text style={[styles.optionText, difficulty === d && styles.optionTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}

          <PrimaryButton title="Start Interview" onPress={loadQuestions} disabled={!difficulty} style={{ marginTop: SPACING.md }} />
        </View>
      )}

      {/* Step 3: Interview Session */}
      {step === 3 && questions.length > 0 && (
        <View style={styles.card}>
          <View style={styles.sessionHeader}>
            <Text style={styles.questionCounter}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
            <View style={styles.timerBadge}>
              <Ionicons name="time-outline" size={16} color={COLORS.warning} />
              <Text style={styles.timerText}>{formatTime(timeLeft)} Remaining</Text>
            </View>
          </View>

          <ProgressBar progress={((currentQuestionIndex + 1) / questions.length) * 100} />

          <View style={styles.spacing} />

          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>

          <View style={styles.spacing} />

          <TextInput
            style={styles.inputArea}
            multiline
            placeholder="Type your answer here..."
            placeholderTextColor={COLORS.textSecondary}
            value={answer}
            onChangeText={setAnswer}
          />

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.voiceBtn} disabled>
              <Ionicons name="mic-off-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.voiceText}>Voice Interview (Coming Soon)</Text>
            </TouchableOpacity>

            <PrimaryButton
              title="Submit Answer"
              onPress={handleSubmit}
              disabled={answer.length === 0}
            />
          </View>
        </View>
      )}

      {/* Step 4 & 5: AI Evaluation & Performance Summary */}
      {step === 4 && feedback && (
        <View>
          <View style={styles.card}>
            <View style={styles.feedbackHeader}>
              <Ionicons name="analytics" size={24} color={COLORS.primary} />
              <Text style={styles.feedbackTitle}>Performance Summary</Text>
            </View>

            <Text style={styles.scoreText}>Overall Score: {feedback.overallScore}/100</Text>

            <View style={styles.spacing} />

            <Text style={styles.subHeading}>AI Evaluation</Text>
            <ScoreCard title="Communication Score" score={feedback.detailedScores.communication} isProgress />
            <ScoreCard title="Technical Score" score={feedback.detailedScores.technical} isProgress />
            <ScoreCard title="Problem Solving Score" score={feedback.detailedScores.problemSolving} isProgress />
            <ScoreCard title="Confidence Score" score={feedback.detailedScores.confidence} isProgress />
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Strengths</Text>
            {feedback.strengths.map((s, i) => (
              <View key={i} style={styles.listItem}>
                <View style={[styles.bullet, { backgroundColor: COLORS.success }]} />
                <Text style={styles.listText}>{s}</Text>
              </View>
            ))}

            <View style={styles.spacing} />

            <Text style={styles.subHeading}>Areas For Improvement</Text>
            {feedback.improvements.map((s, i) => (
              <View key={i} style={styles.listItem}>
                <View style={[styles.bullet, { backgroundColor: COLORS.warning }]} />
                <Text style={styles.listText}>{s}</Text>
              </View>
            ))}

            <View style={styles.spacing} />

            <Text style={[styles.subHeading, { color: COLORS.primary }]}>Recommended Topics To Improve</Text>
            {feedback.recommendedTopics.map((s, i) => (
              <View key={i} style={styles.listItem}>
                <Ionicons name="book-outline" size={16} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                <Text style={styles.listText}>{s}</Text>
              </View>
            ))}

            <PrimaryButton title="Return to Dashboard" onPress={handleFinish} style={{ marginTop: SPACING.xl }} />
          </View>
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
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  optionBtn: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  optionBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  optionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  optionTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  questionCounter: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  timerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.warning,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  questionText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  spacing: {
    height: SPACING.md,
  },
  inputArea: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    height: 150,
    textAlignVertical: 'top',
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.body,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  voiceText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  feedbackTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  scoreText: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginVertical: SPACING.sm,
  },
  subHeading: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: SPACING.md,
  },
  listText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    flex: 1,
  },
});

export default MockInterviewScreen;
