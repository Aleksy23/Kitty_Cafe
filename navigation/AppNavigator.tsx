// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { Text, Platform } from 'react-native';

// Import ekranów
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ServersScreen from '../screens/ServersScreen/ServersScreen';
import ChannelsScreen from '../screens/ChannelsScreen/ChannelsScreen';
import ChannelChatScreen from '../screens/ChannelsScreen/ChannelChatScreen';
import DMsScreen from '../screens/DMsScreen/DMsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DMChatScreen from '../screens/DMsScreen/DMChatScreen';

import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors'; // Direct import
import { fontSizes } from '../theme/typography'; // Direct import

const Tab = createBottomTabNavigator();

// --- Definicje Typów Nawigatorów ---

// Parametry dla stosu serwerów (ServersStack)
export type ServersStackParamList = {
  ServersScreen: undefined;
  ChannelsScreen: { serverId: string };
  ChannelChatScreen: { serverId: string; channelId: string; channelName: string };
};

// Parametry dla stosu DMs (DMsStack) - zmiana nazwy DMsScreen na DMs
export type DMsStackParamList = {
  DMsScreen: undefined; // Zmieniono z DMs na DMsScreen dla spójności z komponentem
  DMChatScreen: { dmId: string; username: string };
};

// Parametry dla stosu Profilu (ProfileStack)
export type ProfileStackParamList = {
  ProfileScreen: undefined; // Zmieniono z Profile na ProfileScreen
};


// Główny stos (AppNavigator)
export type AppStackParamList = {
  Loading: undefined;
  Login: undefined;
  Main: undefined; // To jest alias dla BottomTabNavigator
};

// Parametry dla zakładek w MainTabNavigator
export type MainTabParamList = {
  Home: undefined;
  Servers: undefined; // Stos serwerów
  DMs: undefined;     // Stos DMów
  Profile: undefined; // Ekran profilu
};


// Komponent dla ikon tab navigatora
interface TabBarIconProps {
  name: string;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size }) => (
  <Feather name={String(name)} color={color} size={size} />
);

// Komponenty stosów dla Servers i DMs, które będą używane w Tab.Screen
// To jest lepsze podejście niż tworzenie StackNavigator inline w Tab.Screen component prop,
// ponieważ zapewnia, że stan nawigatora stosu jest zachowywany.
const ServersStack = createStackNavigator<ServersStackParamList>();
const ServersStackScreens = () => (
  <ServersStack.Navigator
    screenOptions={{
      headerShown: false,
      // Usunięto animation: 'none', ponieważ nie jest to prawidłowa opcja w StackNavigationOptions w v6
      cardStyle: { backgroundColor: colors.background },
    }}
    initialRouteName="ServersScreen"
  >
    <ServersStack.Screen name="ServersScreen" component={ServersScreen} />
    <ServersStack.Screen name="ChannelsScreen" component={ChannelsScreen} />
    <ServersStack.Screen name="ChannelChatScreen" component={ChannelChatScreen} />
  </ServersStack.Navigator>
);

const DMsStack = createStackNavigator<DMsStackParamList>();
const DMsStackScreens = () => (
  <DMsStack.Navigator
    screenOptions={{
      headerShown: false,
      // Usunięto animation: 'none', ponieważ nie jest to prawidłowa opcja w StackNavigationOptions w v6
      cardStyle: { backgroundColor: colors.background },
    }}
    initialRouteName="DMsScreen"
  >
    <DMsStack.Screen name="DMsScreen" component={DMsScreen} />
    <DMsStack.Screen name="DMChatScreen" component={DMChatScreen} />
  </DMsStack.Navigator>
);


const MainTabNavigator = () => {
  // Użyj fontSizes.small z theme
  const tabLabelFontSize = fontSizes.small || 12;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 5,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: tabLabelFontSize,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: Platform.OS === 'ios' ? 5 : 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Start",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Servers"
        component={ServersStackScreens}
        options={{
          tabBarLabel: "Serwery",
          tabBarIcon: ({ color, size }) => (
            <Feather name="server" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('Servers', { screen: 'ServersScreen' });
          },
        })}
      />
      <Tab.Screen
        name="DMs"
        component={DMsStackScreens}
        options={{
          tabBarLabel: "Czaty",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-square" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('DMs', { screen: 'DMsScreen' });
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// --- Główna konfiguracja nawigacji ---

const AppNavigator = () => {
  const MainStack = createStackNavigator<AppStackParamList>();
  const { user, isLoadingAuth } = useAuth(); // NOWY: Pobierz stan uwierzytelnienia

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={MyDarkTheme}>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          // Usunięto animation: 'none', ponieważ nie jest to prawidłowa opcja w StackNavigationOptions w v6
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        {isLoadingAuth ? (
          // Ekran ładowania podczas sprawdzania stanu autentykacji
          <MainStack.Screen name="Loading" component={LoadingScreen} />
        ) : user ? (
          // Użytkownik jest zalogowany, pokaż główną część aplikacji
          <MainStack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          // Użytkownik nie jest zalogowany, pokaż ekran logowania
          <MainStack.Screen name="Login" component={LoginScreen} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;