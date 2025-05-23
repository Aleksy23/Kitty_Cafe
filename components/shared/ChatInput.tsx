// components/shared/ChatInput.tsx
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../../theme/colors';
import { borderRadius, spacing, iconSizes } from '../../theme/metrics';
import { fontSizes } from '../../theme/typography';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendMessage: () => void;
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSendMessage,
  placeholder = 'Napisz wiadomość...',
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.inputBar, style]}>
      <TextInput
        style={[styles.input, inputStyle, { maxHeight: 100 }]} // Limit the height of the input
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline
        returnKeyType="send"
        onSubmitEditing={onSendMessage}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={onSendMessage}
        disabled={value.trim().length === 0} // Disable if empty
      >
        <Feather name="send" size={iconSizes.medium} color={colors.buttonLoginText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.s,
    paddingVertical: Platform.select({
      ios: spacing.s,
      web: spacing.s,
      default: spacing.s, // Slightly less padding for Android
    }),
    marginTop: spacing.s,
    marginBottom: Platform.select({
      ios: 0,
      web: 0,
      default: spacing.s,
    }),
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: fontSizes.body,
    paddingVertical: Platform.select({
      ios: spacing.s,
      web: spacing.s,
      default: spacing.s,
    }),
    ...(Platform.OS === 'web' && { outlineStyle: 'none' } as any),
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.s,
  },
});

export default ChatInput;