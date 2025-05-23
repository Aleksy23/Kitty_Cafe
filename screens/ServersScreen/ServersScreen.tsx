import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ServersStackParamList } from '../../navigation/AppNavigator';
import { mockServers } from '../../data/mockData';

// NOWY: Importuj komponenty i style
import ScreenContainer from '../../components/shared/ScreenContainer';
import ThemedText from '../../components/shared/ThemedText';
import ListItem from '../../components/shared/ListItem';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/metrics';

type ServersScreenNavigationProp = StackNavigationProp<ServersStackParamList, 'ServersScreen'>;

interface ServersScreenProps {
  navigation: ServersScreenNavigationProp;
}

const ServersScreen = ({ navigation }: ServersScreenProps) => {
  return (
    <ScreenContainer>
      <ThemedText variant="h2" textAlign="center" style={styles.title}>
        Twoje serwery
      </ThemedText>
      <FlatList
        data={mockServers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => navigation.navigate('ChannelsScreen', { serverId: item.id })}
            title={item.name}
            // Upewnij się, że item.members istnieje przed próbą odczytania length
            subtitle={`${item.members ? item.members.length : 0} członków`}
            icon={
              <Feather
                name="globe" // Przykładowa ikona
                size={32} // Rozmiar ikony można też pobrać z theme, np. iconSizes.medium
                color={colors.primary}
              />
            }
            // Możesz dodać inne propsy do ListItem, jeśli są potrzebne, np. isTablet
          />
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    // ScreenContainer powinien zarządzać paddingiem, więc marginTop może nie być potrzebny
    // jeśli ScreenContainer ma padding pionowy. Jeśli nie, zostaw lub dostosuj.
    marginTop: spacing.m,
    marginBottom: spacing.l,
  },
  listContent: {
    paddingHorizontal: spacing.m, // Dodaj padding horyzontalny dla listy w ScreenContainer
    paddingBottom: spacing.m, // Zapewnia, że ostatni element nie jest przycięty
  },
  // Usunięto stare style:
  // container, containerTablet, containerWeb, titleTablet,
  // serverItem, serverItemTablet, iconCircle, iconLetter,
  // serverInfo, serverName, memberCount
  // Wszystkie te style są teraz zarządzane przez ScreenContainer, ThemedText i ListItem
});

export default ServersScreen;