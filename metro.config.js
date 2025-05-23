// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config'); // Zwróć uwagę na @expo/metro-config

const config = getDefaultConfig(__dirname);

// Jeśli musisz dodać własne rozszerzenia plików (np. dla specyficznych bibliotek)
// config.resolver.assetExts.push('cjs'); // Przykład
// config.resolver.sourceExts.push('cjs'); // Przykład

module.exports = config;