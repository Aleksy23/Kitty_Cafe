import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'; // Usunęliśmy Text, TouchableOpacity, useWindowDimensions, Platform
import { currentUser } from '../../data/mockData';

// NOWY: Importuj komponenty i style
import ScreenContainer from '../../components/shared/ScreenContainer';
import ThemedText from '../../components/shared/ThemedText';
// Zakładam, że masz plik theme.ts lub theme.js w katalogu ../../theme
// oraz komponenty ScreenContainer i ThemedText w ../../components/shared/
// Upewnij się, że plik theme.ts zawiera definicje dla:
// colors.success, colors.warning, colors.error, colors.offline
// np.:
// export const colors = {
//   // ... inne kolory
//   success: '#43b581',
//   warning: '#faa61a',
//   error: '#f04747',
//   offline: '#747f8d',
//   buttonLoginText: '#f2e9e4', // Używane w ThemedText dla awatara
// };
import { colors } from '../../theme/colors'; // DIRECT IMPORT
import { spacing, borderRadius } from '../../theme/metrics'; // DIRECT IMPORT

const ProfileScreen = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return colors.success;
      case 'idle': return colors.warning;
      case 'do_not_disturb': return colors.error;
      default: return colors.offline;
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {/* Rozważ użycie Image z currentUser.avatar jeśli dostępne */}
            <View style={styles.avatarCircle}>
              <ThemedText variant="h1" color={colors.buttonLoginText}>
                {currentUser.username[0].toUpperCase()}
              </ThemedText>
            </View>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(currentUser.status) }]} />
          </View>
          <ThemedText variant="h3" textAlign="center" style={styles.username}>
            {currentUser.username}
          </ThemedText>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(currentUser.status) }]} />
            <ThemedText variant="small" color={colors.textSecondary}>
              {currentUser.status === 'online' ? 'Online' :
               currentUser.status === 'idle' ? 'Zaraz wracam' :
               currentUser.status === 'do_not_disturb' ? 'Nie przeszkadzać' : 'Offline'}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText variant="body" color={colors.text}>ID użytkownika:</ThemedText>
            <ThemedText variant="body" color={colors.textSecondary}>{currentUser.id}</ThemedText>
          </View>
          {/* Możesz dodać więcej informacji o profilu tutaj, np. email, data dołączenia */}
          {/* 
          <View style={styles.infoRow}>
            <ThemedText variant="body" color={colors.text}>Email:</ThemedText>
            <ThemedText variant="body" color={colors.textSecondary}>{currentUser.email}</ThemedText>
          </View>
          */}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', // Wyśrodkowuje kartę profilu w poziomie
    paddingVertical: spacing.l, // Padding pionowy dla ScrollView
    paddingHorizontal: spacing.m, // Padding horyzontalny, aby karta nie dotykała krawędzi na węższych ekranach
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.l, // Użyj borderRadius z theme
    padding: spacing.xl, // Większy padding dla karty
    alignItems: 'center',
    width: '100%', // Karta zajmuje całą szerokość kontenera (z uwzględnieniem paddingu scrollContent)
    maxWidth: 400, // Maksymalna szerokość karty
    // Możesz dodać cienie dla web/iOS, jeśli chcesz
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: borderRadius.m,
    // elevation: 3, // dla Androida
  },
  avatarContainer: {
    position: 'relative', // Potrzebne dla statusIndicator
    marginBottom: spacing.m,
  },
  avatarCircle: {
    width: 100, // Rozmiar awatara
    height: 100,
    borderRadius: 50, // Połowa width/height dla idealnego koła
    backgroundColor: colors.primary, // Kolor tła awatara
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 20, // Rozmiar wskaźnika statusu
    height: 20,
    borderRadius: 10, // Połowa width/height
    borderWidth: 4, // Grubość obramowania wskaźnika
    borderColor: colors.card, // Kolor tła karty, aby stworzyć efekt "wycięcia"
  },
  username: {
    marginBottom: spacing.s,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l, // Większy odstęp pod statusem
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.s, // Odstęp kropki od tekstu statusu
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Aby elementy w wierszu rozciągnęły się na całą szerokość karty
    marginBottom: spacing.s,
    paddingHorizontal: spacing.s, // Mały padding, aby tekst nie dotykał krawędzi
  },
  // Usunięto stare style:
  // container, containerTablet, containerWeb,
  // profileCardTablet, avatarCircleTablet, avatarLetter, avatarLetterTablet,
  // usernameTablet, statusText, statusTextTablet,
  // editButton, editButtonTablet, editButtonText, editButtonTextTablet
});

export default ProfileScreen;