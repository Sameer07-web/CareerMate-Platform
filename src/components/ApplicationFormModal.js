import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import AppInput from '../common/AppInput';
import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';

const applicationSchema = yup.object({
  companyName: yup.string().required('Company name is required'),
  positionTitle: yup.string().required('Position title is required'),
  status: yup.string().oneOf(['saved', 'applied', 'interviewing', 'offered', 'rejected']).default('saved'),
  location: yup.string(),
  salaryRange: yup.string(),
  applicationSource: yup.string().oneOf(['LinkedIn', 'Naukri', 'Indeed', 'Referral', 'Company Website', 'Other', '']),
}).required();

export default function ApplicationFormModal({ visible, onClose, onSubmit, initialData }) {
  const isEditing = !!initialData;
  
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(applicationSchema),
    defaultValues: {
      companyName: '',
      positionTitle: '',
      status: 'saved',
      location: '',
      salaryRange: '',
      applicationSource: ''
    }
  });

  const currentStatus = watch('status');

  useEffect(() => {
    if (visible) {
      if (initialData) {
        reset({
          companyName: initialData.companyName || '',
          positionTitle: initialData.positionTitle || '',
          status: initialData.status || 'saved',
          location: initialData.location || '',
          salaryRange: initialData.salaryRange || '',
          applicationSource: initialData.applicationSource || ''
        });
      } else {
        reset({
          companyName: '',
          positionTitle: '',
          status: 'saved',
          location: '',
          salaryRange: '',
          applicationSource: ''
        });
      }
    }
  }, [visible, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const statuses = [
    { label: 'Saved', value: 'saved' },
    { label: 'Applied', value: 'applied' },
    { label: 'Interviewing', value: 'interviewing' },
    { label: 'Offered', value: 'offered' },
    { label: 'Rejected', value: 'rejected' }
  ];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{isEditing ? 'Edit Application' : 'New Application'}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <AppInput
            control={control}
            name="companyName"
            label="Company Name*"
            placeholder="e.g. Google"
          />
          <AppInput
            control={control}
            name="positionTitle"
            label="Position Title*"
            placeholder="e.g. Frontend Engineer"
          />
          
          <Text style={styles.label}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScroll}>
            {statuses.map(s => (
              <TouchableOpacity 
                key={s.value} 
                style={[styles.statusPill, currentStatus === s.value && styles.activePill]}
                onPress={() => setValue('status', s.value)}
              >
                <Text style={[styles.statusText, currentStatus === s.value && styles.activeText]}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <AppInput
            control={control}
            name="location"
            label="Location"
            placeholder="e.g. Remote, New York"
          />
          <AppInput
            control={control}
            name="salaryRange"
            label="Salary Range"
            placeholder="e.g. $100k - $120k"
          />
          <AppInput
            control={control}
            name="applicationSource"
            label="Source"
            placeholder="e.g. LinkedIn"
          />
          
          <View style={styles.buttonContainer}>
            <SecondaryButton title="Cancel" onPress={onClose} style={styles.halfBtn} />
            <PrimaryButton title={isEditing ? 'Save Changes' : 'Add Application'} onPress={handleSubmit(handleFormSubmit)} style={styles.halfBtn} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  closeBtn: {
    padding: SPACING.xs,
  },
  formContainer: {
    padding: SPACING.lg,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  statusScroll: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  statusPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
  },
  activePill: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    borderColor: COLORS.primary,
  },
  statusText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  activeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  halfBtn: {
    width: '48%',
  }
});
