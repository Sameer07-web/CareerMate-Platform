import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchProfile, logoutUser } from '../store/authSlice';
import { COLORS } from '../theme';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function SplashScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      // Small delay for branding effect
      setTimeout(() => {
        dispatch(fetchProfile()).unwrap().catch(() => {
          // If fetchProfile fails, we dispatch logout to ensure token is cleared
          dispatch(logoutUser());
        });
      }, 1500);
    };

    initAuth();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <LoadingSpinner color={COLORS.primary} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
