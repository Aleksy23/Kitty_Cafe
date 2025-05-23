// screens/HomeScreen/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native'; // Usunęliśmy Text i Platform, useWindowDimensions
import { currentUser } from '../../data/mockData';
import ScreenContainer from '../../components/shared/ScreenContainer'; // NOWY
import ThemedText from '../../components/shared/ThemedText'; // NOWY

import { colors } from '../../theme/colors'; // DIRECT IMPORT
import { spacing } from '../../theme/metrics'; // DIRECT IMPORT

const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer style={styles.container}>
      <ThemedText variant="h1" textAlign="center" style={styles.titleMargin}>
        Kitty Cafe
      </ThemedText>
      <ThemedText variant="subtitle" textAlign="center" style={styles.subtitleMargin}>
        Witaj ponownie, {currentUser.username}!
      </ThemedText>
      <View style={styles.box}>
        <ThemedText variant="body" textAlign="center" style={styles.boxText}>
          To jest Twój ekran główny. Wkrótce pojawią się tu serwery, kanały i wiadomości!
        </ThemedText>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.m, // Użyj padding z metrics
  },
  titleMargin: {
    marginBottom: spacing.m,
  },
  subtitleMargin: {
    marginBottom: spacing.xxl, // Większy margines
  },
  box: {
    backgroundColor: colors.card,
    borderRadius: spacing.l,
    padding: spacing.l,
    width: '100%',
    maxWidth: 400, // Ogranicz szerokość pudełka
  },
  boxText: {
    // color: colors.text, // ThemedText powinien sam zarządzać kolorem na podstawie wariantu
    // Jeśli ThemedText nie ustawia koloru domyślnie lub chcesz go nadpisać:
    // color: colors.text,
  },
});

export default HomeScreen;