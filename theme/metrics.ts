// theme/metrics.ts
import { Platform } from 'react-native';

export const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 24, // Dla np. pól input
  round: 999, // Dla np. okrągłych avatarów
};

// Możesz dodać inne metryki, np. szerokości linii, rozmiary ikon itp.
export const iconSizes = {
  small: 16,
  medium: 24,
  large: 32,
};

// Maksymalna szerokość dla widoku na webie, którą masz powtarzalną
export const webMaxWidth = 700;