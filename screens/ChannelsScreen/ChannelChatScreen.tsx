// screens/ChannelsScreen/ChannelChatScreen.tsx
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { ServersStackParamList } from '../../navigation/AppNavigator';
import { mockServers, currentUser, Message } from '../../data/mockData';

// NOWY: Importuj ChatScreenBase
// Upewnij się, że ścieżka do ChatScreenBase jest poprawna
// i że komponent ChatScreenBase jest zaimplementowany.
import ChatScreenBase from '../../components/shared/ChatScreenBase';

// Używamy typu zdefiniowanego w AppNavigator
type ChannelChatScreenRouteProp = RouteProp<ServersStackParamList, 'ChannelChatScreen'>;

type ChannelChatScreenProps = {
  route: ChannelChatScreenRouteProp;
};

const ChannelChatScreen: React.FC<ChannelChatScreenProps> = ({ route }) => {
  const { serverId, channelId, channelName } = route.params;
  const server = mockServers.find(s => s.id === serverId);
  const channel = server?.channels.find(c => c.id === channelId);

  // Musimy zarządzać stanem wiadomości lokalnie, ponieważ mockData jest stałe
  // Nowe wiadomości pojawiają się na dole (standardowa kolejność)
  const [messages, setMessages] = useState<Message[]>(channel?.messages ? [...channel.messages] : []);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      author: currentUser,
      timestamp: new Date().toISOString(),
      content: content,
    };
    // Dodaj nową wiadomość na koniec tablicy
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Jeśli serwer lub kanał nie istnieje, ChatScreenBase powinien obsłużyć pusty stan
  // lub możesz dodać tutaj warunek i zwrócić inny komponent.
  // Dla uproszczenia, zakładamy, że ChatScreenBase poradzi sobie z pustymi `messages`
  // i wyświetli `isEmptyState`.

  // Jeśli serwer lub kanał nie istnieje, wyświetlamy odpowiedni komunikat
  if (!server || !channel) {
    return (
      <ChatScreenBase
        chatTitle={`#${channelName}`}
        messages={[]}
        onSendMessage={handleSendMessage}
        currentUser={currentUser}
        isEmptyState="Serwer lub kanał nie znaleziony."
      />
    );
  }

  return (
    <ChatScreenBase
      chatTitle={`#${channelName}`}
      messages={messages}
      onSendMessage={handleSendMessage}
      currentUser={currentUser}
      isEmptyState="To jest początek kanału."
    />
  );
};

// Usuń wszystkie style ze StyleSheet.create, są już w ChatScreenBase
// const styles = StyleSheet.create({});

export default ChannelChatScreen;