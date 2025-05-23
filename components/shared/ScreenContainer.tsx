// components/shared/ScreenContainer.tsx
import React from 'react';
import { StyleSheet, useWindowDimensions, Platform, ViewStyle } from 'react-native';
import { SafeAreaView, Edges } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing, webMaxWidth } from '../../theme/metrics';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edges;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style, edges = ['top', 'right', 'bottom', 'left'] as const }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView
      style={[
        styles.container,
        isTablet && styles.containerTablet,
        Platform.OS === 'web' && styles.containerWeb,
        style, 
      ]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.m, 
    paddingBottom: spacing.m, 
  },
  containerTablet: {
    paddingHorizontal: spacing.xxl, 
  },
  containerWeb: {
    maxWidth: webMaxWidth, 
    alignSelf: 'center',
    width: '100%',
  },
});

export default ScreenContainer;