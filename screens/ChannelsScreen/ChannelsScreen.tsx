import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ServersStackParamList } from '../../navigation/AppNavigator';
import { mockServers } from '../../data/mockData';

import ScreenContainer from '../../components/shared/ScreenContainer';
import ThemedText from '../../components/shared/ThemedText';
import ListItem from '../../components/shared/ListItem';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/metrics';

type Props = StackScreenProps<ServersStackParamList, 'ChannelsScreen'>;

const ChannelsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { serverId } = route.params;
  const server = mockServers.find(s => s.id === serverId);

  if (!server) {
    return (
      <ScreenContainer style={styles.centered} edges={['top', 'right', 'bottom', 'left']}>
        <ThemedText variant="body" color={colors.text} textAlign="center">
          Serwer nie znaleziony
        </ThemedText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ThemedText variant="h2" textAlign="center" style={styles.title}>
        Kanały serwera {server.name}
      </ThemedText>
      <FlatList
        data={server.channels}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => {
              if (item.type === 'text') {
                navigation.navigate('ChannelChatScreen', {
                  serverId: server.id,
                  channelId: item.id,
                  channelName: item.name,
                });
              } else {
                alert(`Dołączono do kanału głosowego: ${item.name}`);
              }
            }}
            title={item.name}
            subtitle={item.type === 'text' ? 'Kanał tekstowy' : `${item.members?.length || 0} osób na kanale głosowym`}
            icon={
              <Feather
                name={item.type === 'text' ? 'hash' : 'mic'}
                size={24}
                color={colors.textSecondary}
              />
            }
            rightContent={
              item.type === 'voice' && item.members && item.members.length > 0 ? (
                <View style={styles.voiceChannelMembers}>
                  <Feather name="users" size={16} color={colors.textSecondary} style={styles.voiceMemberIcon} />
                  <ThemedText variant="xSmall" color={colors.textSecondary}>
                    {item.members.length}
                  </ThemedText>
                </View>
              ) : null
            }
          />
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.m,
    marginBottom: spacing.l,
    paddingHorizontal: spacing.m,
  },
  listContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
  },
  voiceChannelMembers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceMemberIcon: {
    marginRight: spacing.s,
  },
});

export default ChannelsScreen;