// screens/DMsScreen/DMChatScreen.tsx
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { DMsStackParamList } from '../../navigation/AppNavigator';
import { mockDMs, currentUser, Message } from '../../data/mockData';

// NOWY: Importuj ChatScreenBase
// Upewnij się, że ścieżka do ChatScreenBase jest poprawna
// i że komponent ChatScreenBase jest zaimplementowany.
import ChatScreenBase from '../../components/shared/ChatScreenBase';

type DMChatScreenRouteProp = RouteProp<DMsStackParamList, 'DMChatScreen'>;

type DMChatScreenProps = {
  route: DMChatScreenRouteProp;
};

const DMChatScreen: React.FC<DMChatScreenProps> = ({ route }) => {
  const { dmId, username } = route.params;
  const dm = mockDMs.find(d => d.id === dmId);

  // Musimy zarządzać stanem wiadomości lokalnie, ponieważ mockData jest stałe
  // Nowe wiadomości pojawiają się na dole (standardowa kolejność)
  const [messages, setMessages] = useState<Message[]>(dm?.messages ? [...dm.messages] : []);

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

  // Jeśli DM nie istnieje, ChatScreenBase powinien obsłużyć pusty stan
  // lub możesz dodać tutaj warunek i zwrócić inny komponent.

  return (
    <ChatScreenBase
      chatTitle={username}
      messages={messages}
      onSendMessage={handleSendMessage}
      currentUser={currentUser}
      isEmptyState="To jest początek konwersacji."
      // Możesz przekazać dodatkowe propsy do ChatScreenBase, jeśli są potrzebne,
      // np. informację o tym, czy konwersacja została znaleziona.
    />
  );
};

export default DMChatScreen;