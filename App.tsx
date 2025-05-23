import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { colors } from './theme/colors'; // Direct import

const AppRoot = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <View style={styles.root}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
          translucent={true}
        />
        <AppNavigator />
      </View>
    </AuthProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default AppRoot;