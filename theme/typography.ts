// theme/typography.ts
import { Platform } from 'react-native';

export const fontSizes = {
  h1: 38,
  h2: 28,
  h3: 24,
  body: 16,
  subtitle: 20,
  small: 14,
  xSmall: 10,
  label: 12, // <-- DODAJ TO JEŚLI UŻYWASZ
};

export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  bold: '700',
};

//  Niestandardowe czcionki (Future)
// Przykład:
// export const customFonts = {
//   regular: Platform.select({
//     ios: 'System Font',
//     android: 'Roboto',
//     default: 'sans-serif',
//   }),
//   bold: Platform.select({
//     ios: 'System Font Bold',
//     android: 'Roboto-Bold',
//     default: 'sans-serif-bold',
//   }),
// };