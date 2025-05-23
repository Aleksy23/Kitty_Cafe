import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DMsStackParamList } from '../../navigation/AppNavigator';
import { mockDMs } from '../../data/mockData';

import ScreenContainer from '../../components/shared/ScreenContainer';
import ThemedText from '../../components/shared/ThemedText';
import ListItem from '../../components/shared/ListItem';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/metrics';

type DMsScreenNavigationProp = StackNavigationProp<DMsStackParamList, 'DMsScreen'>;

interface DMsScreenProps {
  navigation: DMsScreenNavigationProp;
}

const DMsScreen = ({ navigation }: DMsScreenProps) => {

  const formatTimeString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScreenContainer>
      <ThemedText variant="h2" textAlign="center" style={styles.title}>
        Czaty prywatne
      </ThemedText>
      <FlatList
        data={mockDMs}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => navigation.navigate('DMChatScreen', { dmId: item.id, username: item.user.username })}
            title={item.user.username}
            subtitle={item.messages.length > 0 ? item.messages[item.messages.length - 1].content : 'Brak wiadomości'}
            icon={
              <View style={styles.avatarCircle}>
                <ThemedText variant="h3" color={colors.buttonLoginText}>
                  {item.user.username[0].toUpperCase()}
                </ThemedText>
              </View>
            }
            rightContent={
              item.messages.length > 0 && (
                <ThemedText variant="xSmall" color={colors.textSecondary}>
                  {formatTimeString(item.lastMessageTime)}
                </ThemedText>
              )
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText variant="body" textAlign="center" color={colors.textSecondary}>
              Nie masz jeszcze żadnych czatów prywatnych
            </ThemedText>
          </View>
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.m,
    marginBottom: spacing.l,
    paddingHorizontal: spacing.m,
  },
  listContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l,
  },
});

export default DMsScreen;