// components/shared/ThemedText.tsx
import React from 'react';
import { Text, TextStyle, useWindowDimensions } from 'react-native';
import { colors } from '../../theme/colors'; // DIRECT IMPORT
import { fontSizes, fontWeights } from '../../theme/typography'; // DIRECT IMPORT

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'subtitle'
  | 'small'
  | 'xSmall'
  | 'button'; // Dodana nowa wariacja dla tekstu przycisków

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: TextStyle | TextStyle[];
  color?: string; // Pozwól na nadpisanie koloru
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: keyof typeof fontWeights; // Pozwól na nadpisanie wagi czcionki
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  style,
  color,
  textAlign,
  fontWeight,
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const getFontSize = (baseSize: number) => {
    if (isTablet) {
      // Przykład skalowania dla tabletów, dostosuj wg potrzeb
      if (variant === 'h1') return fontSizes.h1 + 10;
      if (variant === 'h2') return fontSizes.h2 + 8;
      if (variant === 'subtitle') return fontSizes.subtitle + 5;
    }
    return baseSize;
  };

  const textStyle: TextStyle = {
    color: color || colors.text,
    textAlign: textAlign,
    fontWeight: fontWeight ? fontWeight : "normal",
  };

  switch (variant) {
    case 'h1':
      textStyle.fontSize = getFontSize(fontSizes.h1);
      textStyle.fontWeight = "bold";
      textStyle.color = colors.primary;
      break;
    case 'h2':
      textStyle.fontSize = getFontSize(fontSizes.h2);
      textStyle.fontWeight = "bold";
      textStyle.color = colors.primary;
      break;
    case 'h3':
      textStyle.fontSize = getFontSize(fontSizes.h3);
      textStyle.fontWeight = "bold";
      textStyle.color = colors.text;
      break;
    case 'subtitle':
      textStyle.fontSize = getFontSize(fontSizes.subtitle);
      textStyle.color = colors.text;
      break;
    case 'small':
      textStyle.fontSize = fontSizes.small;
      break;
    case 'xSmall':
      textStyle.fontSize = fontSizes.xSmall;
      break;
    case 'button':
      textStyle.fontSize = fontSizes.small;
      textStyle.fontWeight = "bold";
      break;
    case 'body':
    default:
      textStyle.fontSize = fontSizes.body;
      break;
  }

  return <Text style={[textStyle, style]}>{children}</Text>;
};

export default ThemedText;