import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchProfile, logoutUser } from '../store/authSlice';
import { COLORS } from '../theme';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function SplashScreen() {
  const dispatch = useDispatch();
  console.log('[SPLASH] mounted');

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const initAuth = async () => {
      console.log('[SPLASH] initAuth timeout started');
      // Small delay for branding effect
      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        console.log('[SPLASH] timeout finished, dispatching fetchProfile');
        dispatch(fetchProfile()).unwrap().catch(() => {
          // If fetchProfile fails, we dispatch logout to ensure token is cleared
          if (isMounted) {
            dispatch(logoutUser());
          }
        });
      }, 1500);
    };

    initAuth();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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
