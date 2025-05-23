// components/shared/ListItem.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle, useWindowDimensions, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/metrics';
import ThemedText from './ThemedText';

interface ListItemProps {
  onPress: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode; // Możesz przekazać ikonę (np. Feather icon)
  rightContent?: React.ReactNode; // Zawartość po prawej stronie (np. czas, liczba członków)
  style?: ViewStyle | ViewStyle[];
}

const ListItem: React.FC<ListItemProps> = ({
  onPress,
  title,
  subtitle,
  icon,
  rightContent,
  style,
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        isTablet && styles.itemContainerTablet,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <ThemedText variant="h3" style={styles.titleText}>{title}</ThemedText>
        {subtitle && <ThemedText variant="small" color={colors.textSecondary}>{subtitle}</ThemedText>}
      </View>
      {rightContent && <View style={styles.rightContentContainer}>{rightContent}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.m,
  },
  itemContainerTablet: {
    padding: spacing.l,
    marginBottom: spacing.l,
  },
  iconContainer: {
    marginRight: spacing.m,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18, // Override default h3 size for list items if needed
    fontWeight: 'bold',
    color: colors.text,
  },
  rightContentContainer: {
    marginLeft: spacing.m,
  },
});

export default ListItem;