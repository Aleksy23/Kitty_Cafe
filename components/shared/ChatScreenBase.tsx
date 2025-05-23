// components/shared/ChatScreenBase.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import ScreenContainer from './ScreenContainer';
import ThemedText from './ThemedText';
import ChatInput from './ChatInput';
import { colors } from '../../theme/colors'; // DIRECT IMPORT
import { spacing, borderRadius } from '../../theme/metrics'; // DIRECT IMPORT
import { Message, User } from '../../data/mockData'; // Importuj interfejsy

interface ChatScreenBaseProps {
  chatTitle: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentUser: User;
  isEmptyState?: string; // Wiadomość gdy czat jest pusty
}

const ChatScreenBase: React.FC<ChatScreenBaseProps> = ({
  chatTitle,
  messages,
  onSendMessage,
  currentUser,
  isEmptyState,
}) => {
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    // Przewiń na dół po załadowaniu lub dodaniu nowych wiadomości
    if (messages.length > 0) {
      setTimeout(() => { // Użyj setTimeout, aby upewnić się, że FlatList się zaktualizował
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim().length === 0) return;
    onSendMessage(input);
    setInput('');
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageItem = ({ item, index }: ListRenderItemInfo<Message>) => {
    const isMyMessage = item.author.id === currentUser.id;
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];

    // Czy to pierwsza wiadomość tego autora w serii?
    const isFirstOfAuthor =
      !prevMessage || prevMessage.author.id !== item.author.id;

    // Czy to ostatnia wiadomość tego autora w serii?
    const isLastOfAuthor =
      !nextMessage || nextMessage.author.id !== item.author.id;

    return (
      <View
        style={[
          styles.messageBubble,
          isMyMessage ? styles.myMessage : styles.theirMessage,
          isFirstOfAuthor && styles.messageGroupMarginTop,
          isLastOfAuthor && styles.messageGroupMarginBottom,
        ]}
      >
        {/* Nazwa autora tylko przy pierwszej wiadomości w serii */}
        {!isMyMessage && isFirstOfAuthor && (
          <ThemedText
            variant="small"
            fontWeight="bold"
            color={colors.primary}
            style={styles.authorName}
          >
            {item.author.username}
          </ThemedText>
        )}
        <ThemedText variant="body" color={colors.text} style={styles.content}>
          {item.content}
        </ThemedText>
        {/* Timestamp tylko przy ostatniej wiadomości w serii */}
        <ThemedText
          variant="xSmall"
          color={isMyMessage ? colors.accent : colors.textSecondary}
          style={[
            styles.timestamp,
            isMyMessage ? styles.timestampMe : styles.timestampThem,
            ...(!isLastOfAuthor ? [{ opacity: 0 }] : []), // Ukryj timestamp jeśli nie ostatnia z serii
          ]}
        >
          {formatTimestamp(item.timestamp)}
        </ThemedText>
      </View>
    );
  };

  return (
    <ScreenContainer edges={['top', 'right', 'left']}>
      <ThemedText variant="h2" textAlign="center" style={styles.title}>
        {chatTitle}
      </ThemedText>
      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText variant="body" color={colors.textSecondary} textAlign="center">
            {isEmptyState || 'Brak wiadomości w tym czacie.'}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messageListContent}
          inverted={false} // Zostawiamy false i scrollujemy na koniec, aby ułatwić obsługę
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Dostosuj offset dla iOS
        style={styles.keyboardAvoidingView}
      >
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSendMessage={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.m,
    marginBottom: spacing.l,
  },
  messageListContent: {
    paddingVertical: spacing.s,
    paddingBottom: spacing.m, // Dodatkowy padding na dole, aby klawiatura nie zasłaniała ostatniej wiadomości
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.s,
    borderRadius: borderRadius.l,
    marginBottom: spacing.s,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary, // Kolor dla moich wiadomości
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card, // Kolor dla wiadomości innych
  },
  authorName: {
    marginBottom: spacing.s,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    marginTop: spacing.s,
  },
  timestampMe: {
    alignSelf: 'flex-end',
    color: colors.accent,
  },
  timestampThem: {
    alignSelf: 'flex-start',
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    paddingBottom: Platform.select({
      ios: 0, // iOS KeyboardAvoidingView handles bottom padding
      android: spacing.s, // Add some padding for Android
      web: spacing.s,
    }),
  },
  messageGroupMarginTop: {
    marginTop: spacing.m, // Większy odstęp na górze grupy
  },
  messageGroupMarginBottom: {
    marginBottom: spacing.s, // Większy odstęp na dole grupy
  },
});

export default ChatScreenBase;