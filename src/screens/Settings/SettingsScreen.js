import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { appStore } from '../../store/appStore';
import { authService } from '../../services/authService';
import SectionHeader from '../../components/SectionHeader';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    privacyMode: false,
  });

  useEffect(() => {
    setSettings(appStore.getSettings());
  }, []);

  const toggleSetting = (key) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    appStore.updateSetting(key, newValue);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigation.replace('Login');
  };

  const renderSettingRow = (title, icon, isSwitch, switchKey) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Ionicons name={icon} size={24} color={COLORS.textPrimary} style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={settings[switchKey]}
          onValueChange={() => toggleSetting(switchKey)}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={'#fff'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader title="Settings" />

      <View style={styles.settingsGroup}>
        {renderSettingRow('Notifications', 'notifications-outline', true, 'notifications')}
        {renderSettingRow('Dark Mode', 'moon-outline', true, 'darkMode')}
        {renderSettingRow('Privacy Mode', 'lock-closed-outline', true, 'privacyMode')}
      </View>

      <SectionHeader title="About" />
      <View style={styles.settingsGroup}>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>About CareerMate</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={COLORS.warning} style={styles.settingIcon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>CareerMate v1.0.0</Text>
      </View>
      
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
  settingsGroup: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SPACING.md,
  },
  settingTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  linkText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  versionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});

export default SettingsScreen;
