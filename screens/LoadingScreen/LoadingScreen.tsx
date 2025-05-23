// screens/LoadingScreen/LoadingScreen.tsx
import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import ScreenContainer from '../../components/shared/ScreenContainer';
import ThemedText from '../../components/shared/ThemedText';
import { colors } from '../../theme/colors'; // DIRECT IMPORT
import { spacing } from '../../theme/metrics'; // DIRECT IMPORT
import { useAuth } from '../../context/AuthContext'; // NOWY: Import useAuth
import { StackScreenProps } from '@react-navigation/stack'; // NOWY: Import StackScreenProps
import { AppStackParamList } from '../../navigation/AppNavigator'; // NOWY: Import AppStackParamList

// NOWY: Poprawione typowanie propsów nawigacji
type LoadingScreenProps = StackScreenProps<AppStackParamList, 'Loading'>;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const { isLoadingAuth, user } = useAuth(); // Pobierz stan uwierzytelnienia

  useEffect(() => {
    // Nie wykonuj nawigacji, jeśli isLoadingAuth jest nadal true
    if (!isLoadingAuth) {
      // Gdy ładowanie autoryzacji się zakończy, nawiguj
      if (user) {
        navigation.replace('Main'); // Użytkownik zalogowany, przejdź do głównej aplikacji
      } else {
        navigation.replace('Login'); // Użytkownik nie jest zalogowany, przejdź do logowania
      }
    }
    // Zależności useEffect: isLoadingAuth, user, navigation
  }, [isLoadingAuth, user, navigation]);

  // Ekran ładowania jest wyświetlany, dopóki isLoadingAuth jest true
  // lub na krótko, zanim useEffect dokona przekierowania.
  return (
    <ScreenContainer style={styles.container}>
      <ThemedText variant="h1" textAlign="center" style={styles.titleMargin}>
        Kitty Cafe
      </ThemedText>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.indicator}
      />
      <ThemedText variant="subtitle" textAlign="center">
        Ładowanie...
      </ThemedText>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.m, // Użyj spacing z theme
    flex: 1, // Aby kontener zajął cały ekran
  },
  titleMargin: {
    marginBottom: spacing.m, // Użyj spacing z theme
  },
  indicator: {
    marginBottom: spacing.m, // Użyj spacing z theme
  },
});

export default LoadingScreen;
