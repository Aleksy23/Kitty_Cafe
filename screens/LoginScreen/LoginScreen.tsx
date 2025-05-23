// screens/LoginScreen/LoginScreen.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import ScreenContainer from '../../components/shared/ScreenContainer';
import ThemedText from '../../components/shared/ThemedText';
import { colors } from '../../theme/colors'; // DIRECT IMPORT
import { spacing, borderRadius } from '../../theme/metrics'; // DIRECT IMPORT
import { useAuth } from '../../context/AuthContext'; // NOWY: Import useAuth

type LoginScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Login'>;

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const { login } = useAuth(); // Użyj funkcji login z kontekstu

  const handleLogin = () => {
    login(); // Wywołaj funkcję login z AuthContext
    // Nawigacja zostanie obsłużona przez AppNavigator po zmianie stanu `user` w AuthContext
    // Nie ma potrzeby wywoływania navigation.replace('Main') tutaj.
  };

  return (
    <ScreenContainer style={styles.container}>
      <ThemedText variant="h1" textAlign="center" style={styles.titleMargin}>
        Kitty Cafe
      </ThemedText>
      <ThemedText variant="subtitle" textAlign="center" style={styles.subtitleMargin}>
        Zaloguj się, aby kontynuować
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.loginButton,
          isTablet && styles.loginButtonTablet,
        ]}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <ThemedText
          variant="button"
          color={colors.buttonLoginText}
          style={isTablet ? styles.buttonTextTablet : undefined}
        >
          Zaloguj się
        </ThemedText>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.m,
    flex: 1, // Aby kontener zajął cały ekran
  },
  titleMargin: {
    marginBottom: spacing.m,
  },
  subtitleMargin: {
    marginBottom: spacing.xxl,
  },
  loginButton: {
    backgroundColor: colors.buttonLogin,
    borderRadius: borderRadius.round,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonTablet: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
    width: 250,
  },
  buttonTextTablet: {
    fontSize: 18, // Rozważ użycie skali typograficznej z theme
  },
});

export default LoginScreen;
