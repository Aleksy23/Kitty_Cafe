// components/shared/ButtonLogin.tsx
import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform, Animated, Easing } from 'react-native';

interface ButtonLoginProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({ title, onPress, style, textStyle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  // Nowa wartość animacji dla cienia (będzie animować opacity i elevation)
  const shadowOpacityAnim = useRef(new Animated.Value(0.2)).current; // Domyślna przezroczystość cienia
  const elevationAnim = useRef(new Animated.Value(4)).current; // Domyślna elewacja dla Androida

  // Funkcja do animacji wciśnięcia przycisku
  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(translateYAnim, {
        toValue: 2, // Lekko w dół
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: Platform.OS !== 'web',
      }),
      // Animacja przezroczystości cienia dla iOS/Android
      Platform.OS !== 'web' ? Animated.timing(shadowOpacityAnim, {
        toValue: 0, // Cień "chowa się" (zmniejsza przezroczystość)
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }) : Animated.timing(new Animated.Value(0), { toValue: 0, duration: 0, useNativeDriver: true }), // Dummy animacja dla webu
      // Animacja elewacji dla Androida
      Platform.OS === 'android' ? Animated.timing(elevationAnim, {
        toValue: 0, // Elewacja "chowa się"
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }) : Animated.timing(new Animated.Value(0), { toValue: 0, duration: 0, useNativeDriver: true }) // Dummy animacja dla innych platform
    ]).start();
  };

  // Funkcja do animacji zwolnienia przycisku
  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: Platform.OS !== 'web',
      }),
      // Animacja przezroczystości cienia dla iOS/Android
      Platform.OS !== 'web' ? Animated.timing(shadowOpacityAnim, {
        toValue: 0.2, // Cień wraca
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }) : Animated.timing(new Animated.Value(0), { toValue: 0, duration: 0, useNativeDriver: true }), // Dummy animacja dla webu
      // Animacja elewacji dla Androida
      Platform.OS === 'android' ? Animated.timing(elevationAnim, {
        toValue: 4, // Elewacja wraca
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }) : Animated.timing(new Animated.Value(0), { toValue: 0, duration: 0, useNativeDriver: true }) // Dummy animacja dla innych platform
    ]).start();
  };

  const webProps = Platform.OS === 'web' ? {
    onPointerEnter: () => setIsHovered(true),
    onPointerLeave: () => setIsHovered(false),
  } : {};

  return (
    <Animated.View
      style={[
        {
          transform: [
            { scale: scaleAnim },
            { translateY: translateYAnim },
          ],
        },
        // Zastosowanie animowanego cienia (tylko na mobile)
        Platform.OS !== 'web' && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 }, // Stały offset cienia
          shadowOpacity: shadowOpacityAnim, // Animowana przezroczystość cienia
          shadowRadius: 4, // Stały promień rozmycia cienia
          elevation: elevationAnim, // Animowana elewacja dla Androida
        },
      ]}
      {...webProps}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[
          styles.button,
          style,
          Platform.OS === 'web' && isHovered && styles.buttonHovered,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            textStyle,
            Platform.OS === 'web' && isHovered && styles.buttonTextHovered,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 198,
    height: 47,
    backgroundColor: 'rgba(255, 25, 28, 0.92)',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        transitionProperty: 'background-color',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-out',
      },
    }),
  },
  buttonHovered: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#FFFFFF',
    ...Platform.select({
      web: {
        transitionProperty: 'color',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-out',
      },
    }),
  },
  buttonTextHovered: {
    color: '#000000',
  },
});

export default ButtonLogin;
